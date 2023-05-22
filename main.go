package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"strings"
)

// Create a struct that mimics the webhook response body
// https://core.telegram.org/bots/api#update
type webhookReqBody struct {
	Message struct {
		Text string `json:"text"`
		Chat struct {
			ID int64 `json:"id"`
		} `json:"chat"`
	} `json:"message"`
}

const url = "https://api.telegram.org/bot"
// This handler is called every time telegram sends us a webhook event
func Handler(res http.ResponseWriter, req *http.Request) {

 botUrl, exists := url + os.LookupEnv("BOT_TOKEN")
	// First, decode the JSON response body
	body := &webhookReqBody{}
	if err := json.NewDecoder(req.Body).Decode(body); err != nil {
		fmt.Println("could not decode request body", err)
		return
	}

	// Check if the message contains the word "marco"
	// if not, return without doing anything
	if !strings.Contains(strings.ToLower(body.Message.Text), "marco") {
		return
	}

	// If the text contains marco, call the `sayPolo` function, which
	// is defined below
	if err := sayPolo(body.Message.Chat.ID); err != nil {
		fmt.Println("error in sending reply:", err)
		return
	}

	// log a confirmation message if the message is sent successfully
	fmt.Println("reply sent")
}

//The below code deals with the process of sending a response message
// to the user

// Create a struct to conform to the JSON body
// of the send message request
// https://core.telegram.org/bots/api#sendmessage
type sendMessageReqBody struct {
	ChatID int64  `json:"chat_id"`
	Text   string `json:"text"`
}

// sayPolo takes a chatID and sends "polo" to them
func sayPolo(chatID int64) error {
	// Create the request body struct
	fmt.Println("work")

	reqBody := &sendMessageReqBody{
		ChatID: chatID,
		Text:   "Polo!!",
	}
	// Create the JSON body from the struct
	reqBytes, err := json.Marshal(reqBody)
	if err != nil {
		return err
	}

	// Send a post request with your token
	res, err := http.Post(botUrl + "/sendMessage", "application/json", bytes.NewBuffer(reqBytes))
	if err != nil {
		return err
	}
	if res.StatusCode != http.StatusOK {
		return errors.New("unexpected status" + res.Status)
	}

	return nil
}

func main() {
	fmt.Println("starting server")
	http.ListenAndServe(":3000", http.HandlerFunc(Handler))
}

// package main

// import (
// 	"fmt"

// 	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
// )

// func main() {
//     // Create a new bot instance
//     bot, err := tgbotapi.NewBotAPI("YOUR_TOKEN_HERE")
//     if err != nil {
//         panic(err)
//     }

//     // Enable long polling
//     u := tgbotapi.NewUpdate(0)
//     u.Timeout = 60

//     // Get updates from the bot
//     updates, err := bot.GetUpdatesChan(u)
//     if err != nil {
//         panic(err)
//     }

//     // Send a poll
//     poll := tgbotapi.NewPoll(1234567890, "What is your favorite color?", "Red", "Green", "Blue")
//     msg := tgbotapi.NewMessage(1234567890, "Please vote in this poll:")
//     msg.Media = &poll.MediaPoll

//     _, err = bot.Send(msg)
//     if err != nil {
//         panic(err)
//     }

//     // Wait for updates
//     for update := range updates {
//         if update.Message == nil {
//             continue
//         }

//         fmt.Printf("[%s] %s\n", update.Message.From.UserName, update.Message.Text)
//     }
// }
