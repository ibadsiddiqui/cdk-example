export interface BuildConfig {
  readonly AWSAccountID: string;
  readonly AWSProfileName: string;
  readonly AWSProfileRegion: string;

  readonly App: string;
  readonly Environment: string;
  readonly Version: string;
  readonly Build: string;

  readonly DATABASE_PORT: string;
  readonly DATABASE_USERNAME: string;
  readonly DATABASE_NAME: string;
}
