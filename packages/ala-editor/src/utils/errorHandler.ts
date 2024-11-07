import WarnException from "@/utils/WarnException";
import notify from "@/utils/notify";

export default class errorHandler {
    public static registerErrorHandler(app: any) {
        app.config.errorHandler = (err: any, instance: any, info: any) => {
            // 处理错误
            if (err instanceof WarnException) {
                const errorInfo = err.getInfo();
                notify.warn(errorInfo.title, errorInfo.remark)
            } else {
                console.error(err, instance, info);
            }
        };
    }
}