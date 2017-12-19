export default class Filter {
  protected enabled: boolean = false
  protected control: any = () => true
  public onEnable = () => {}
  public onDisable = () => {}
  public name: string
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
  public get isEnabled(): boolean {
    return this.enabled
  }
  public test(some: any): boolean {
    if (this.enabled === false) return true

    return this.control(some)
  }
}
