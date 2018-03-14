export default class Filter {
  protected enabled: boolean = false
  /**
   * Callback used to define if the item is filtered or not
   */
  public control: any = () => true
  public onEnable = () => {}
  public onDisable = () => {}
  /**
   * Data that ca be attached to the filter to use it if you need it during control
   */
  public externalData: any = null
  /**
   * name of the filter
   */
  public name: string = null
  /**
   * Creates an instance of Filter.
   * @param {*} [control=() => true] action to test an item
   * @param {string} name name of the filter
   * @memberof Filter
   */
  constructor(control: any = () => true, name: string) {
    this.control = control
    this.name = name
  }
  public toggle(): void {
    this.enabled ? this.disable() : this.enable()
  }
  public enable(): void {
    this.enabled = true
    this.onEnable()
  }
  public disable(): void {
    this.enabled = false
    this.onDisable()
  }
  /**
   * get the state of the filter
   *
   * @readonly
   * @type {boolean}
   * @memberof Filter
   */
  public get isEnabled(): boolean {
    return this.enabled
  }
  /**
   * Method used to test an item
   * @param some an item
   * @return {boolean} does the item pass the test ?
   */
  public test(some: any): boolean {
    if (this.enabled === false) return true

    return this.control(some)
  }
}
