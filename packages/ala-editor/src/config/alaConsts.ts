export class alaConsts {
  private static readonly PREFIX = 'ala_';

  //  自定义常量
  public static readonly I18N_LOCALSTORAGE_KEY_NAME = alaConsts.PREFIX + 'i18n_localstorage_key_name';

  public static readonly USER_ROLE = alaConsts.PREFIX + 'USER_ROLE';
  public static readonly ACCESS_TOKEN = alaConsts.PREFIX + 'ACCESS_TOKEN';

  // 私有构造函数，防止实例化
  private constructor() {}
}
