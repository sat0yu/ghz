type TabId = string & { __tabId: never };
const TabId = (tabId: string) => tabId as TabId;

type CallbackFn = () => void;

export default class ContextManager {
  private get tabIds() {
    return Object.keys(this.tabs);
  }
  private current: TabId | undefined;
  private tabs: Record<TabId, CallbackFn>;

  public constructor() {
    this.current = undefined;
    this.tabs = {};
  }

  public getTabs() {
    return this.tabs;
  }

  public select(id: string) {
    const tabId = TabId(id);
    if (!this.include(tabId) || this.isCurrent(tabId)) {
      return;
    }
    this.setCurrent(tabId);
    this.notifyUpdate();
  }

  public isCurrent(id: string) {
    const tabId = TabId(id);
    return this.current === tabId;
  }

  public subscribe(id: string, callback: CallbackFn) {
    const tabId = TabId(id);
    if (this.include(tabId)) {
      return;
    }
    this.tabs = { ...this.tabs, [tabId]: callback };
    // Set the first tab as the current one
    if (!this.current) {
      this.setCurrent(tabId);
      this.notifyUpdate();
    }
  }

  public unsubscribe(id: string) {
    const { [TabId(id)]: _, ...rest } = Object(this.tabs);
    this.tabs = rest;
    if (this.isCurrent(id)) {
      this.setCurrent(TabId(this.tabIds[0]));
      this.notifyUpdate();
    }
  }

  private notifyUpdate() {
    Object.keys(this.tabs).forEach(tabId => this.tabs[tabId]());
  }

  private include(id: TabId) {
    return this.tabIds.includes(id);
  }

  private setCurrent(id: TabId) {
    this.current = TabId(id);
  }
}
