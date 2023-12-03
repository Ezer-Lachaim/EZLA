/* eslint-disable import/first */
import * as path from 'path';

// before importing, set the config files dir to the dir of this file
process.env.NODE_CONFIG_DIR = path.join(__dirname, './values');

import 'dotenv/config';
import config, { IConfig as PackageIConfig } from 'config';
import IConfig from './iConfig';

interface TypedGetterPackageIConfig extends Omit<PackageIConfig, 'get'> {
  get<T extends string & keyof IConfig>(name: T): IConfig[T];
}

export default config as IConfig & TypedGetterPackageIConfig;
