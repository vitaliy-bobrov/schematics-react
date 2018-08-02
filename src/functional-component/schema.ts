export interface Schema {
  /**
   * The path to create the component.
   */
  path?: string;
  /**
   * The name of the component.
   */
  name: string;
  /**
   * The file extension to be used for style files.
   */
  styleext?: string;
  /**
   * Specifies if a spec file is generated.
   */
  noSpec?: boolean;
  /**
   * Flag to indicate if a dir is created.
   */
  subfolder?: boolean;
  /**
   * Specifies if a propTypes used.
   */
  propTypes?: boolean;
  /**
   * Specifies whether to use TypeScript.
   */
  ts?: boolean;
}
