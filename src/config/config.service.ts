import { DotenvParseOutput, config } from 'dotenv';
import { IConfigService } from './config.interface';

export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor() {
    let { error, parsed } = config();

    if (error) {
      parsed = process.env;
    }
    if (!parsed) {
      throw new Error('Error parsing .env file');
    }
    this.config = parsed;
  }

  get(key: string): string {
    const res = this.config[key];
    if (!res) {
      throw new Error('Key not found');
    }
    return res;
  }
}
