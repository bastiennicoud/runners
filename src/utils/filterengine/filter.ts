export default class Filter {
  protected enabled: boolean = false
  protected control: any = () => true
  public onEnable = () => {}
  public onDisable = () => {}
  constructor(control: any = () => true) {
    this.control = control
  }
  public toggle(): void {
    this.enabled ? this.disable() : this.enable()
  }
  public enable(): void {
    this.onEnable()
    this.enabled = true
  }
  public disable(): void {
    this.onDisable()
    this.enabled = false
  }
  public get isEnabled(): boolean {
    return this.enabled
  }
  public test(some: any): boolean {
    if (this.enabled === false) return true

    return this.control(some)
  }
}
