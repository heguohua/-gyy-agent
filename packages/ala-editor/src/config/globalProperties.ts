import { logger } from '@/utils/logger';
import { App, AppConfig } from 'vue';

// 定义一个对象包含所有全局属性
interface GlobalPropertyType {
  [key: string]: any;
}

const gps: GlobalPropertyType = new Object({
  app_name: 'ala-app',
  show_log: false,
});

export class GlobalProperties {
  constructor(public app: App<Element>) {
    this.app = app;
    this.app.config.globalProperties['$gps'] = gps;
  }

  public registryGlobalProperty<T>(key: string, value: T) {
    if (!gps.hasOwnProperty(key)) {
      gps[key] = value;
    }else{
        logger.warn(`Property of [ ${key} ] already exists`)
    }
  }

  public getGlobalProperty<T>(key: string): T {
    return gps[key];
  }

}
