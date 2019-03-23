import ContextManager from '../ContextManager';

describe('ContextManager', () => {
  const initialTabId = 'initialTabId';
  const initialTabCb = jest.fn();
  const anotherTabId = 'anotherTabId';
  const anotherTabCb = jest.fn();

  let subject: ContextManager;

  beforeEach(() => {
    subject = new ContextManager();
    initialTabCb.mockClear();
    anotherTabCb.mockClear();
  });

  describe('subscribe', () => {
    it('adds the given tab', () => {
      expect(subject.getTabs()).toEqual({});
      subject.subscribe(initialTabId, initialTabCb);
      expect(subject.getTabs()).toEqual({ [initialTabId]: initialTabCb });
    });

    it('sets the current tab if and only if there is only the given tab ', () => {
      expect(subject.isCurrent(initialTabId)).toEqual(false);
      subject.subscribe(initialTabId, initialTabCb);
      expect(subject.getTabs()).toEqual({ [initialTabId]: initialTabCb });
      expect(subject.isCurrent(initialTabId)).toEqual(true);
    });

    it('does nothing when given an existing tab', () => {
      subject.subscribe(initialTabId, initialTabCb);
      // when adding the first tab,
      // the subscribe method invokes the registered callback
      initialTabCb.mockClear();
      // check the current tab list
      expect(subject.getTabs()).toEqual({ [initialTabId]: initialTabCb });
      // subscribe the tab again
      subject.subscribe(initialTabId, initialTabCb);
      // confirm that the tab list does not change
      expect(subject.getTabs()).toEqual({ [initialTabId]: initialTabCb });
      // check if the callback is not called
      expect(initialTabCb).not.toBeCalled();
    });
  });

  describe('unsubscribe', () => {
    beforeEach(() => {
      subject.subscribe(initialTabId, initialTabCb);
      subject.subscribe(anotherTabId, anotherTabCb);
    });

    it('removes the specified tab ID', () => {
      expect(subject.getTabs()).toEqual({
        [initialTabId]: initialTabCb,
        [anotherTabId]: anotherTabCb,
      });
      subject.unsubscribe(initialTabId);
      expect(subject.getTabs()).toEqual({
        [anotherTabId]: anotherTabCb,
      });
    });

    it('sets another registered tab as the current', () => {
      expect(subject.isCurrent(initialTabId)).toEqual(true);
      subject.unsubscribe(initialTabId);
      expect(subject.isCurrent(anotherTabId)).toEqual(true);
    });
  });

  describe('isCurrent', () => {
    beforeEach(() => {
      subject.subscribe(initialTabId, initialTabCb);
    });

    it('returns true when given the current tab ID', () => {
      expect(subject.isCurrent(initialTabId)).toEqual(true);
    });

    it('returns false when given irrelevant tab ID', () => {
      expect(subject.isCurrent(anotherTabId)).toEqual(false);
    });
  });

  describe('select', () => {
    beforeEach(() => {
      subject.subscribe(initialTabId, initialTabCb);
      subject.subscribe(anotherTabId, anotherTabCb);

      expect(subject.isCurrent(initialTabId)).toEqual(true);
      expect(subject.isCurrent(anotherTabId)).toEqual(false);
    });

    it('changes the current selected tab and notifies that change to subscribers when given another tab ID', () => {
      subject.select(anotherTabId);
      expect(subject.isCurrent(initialTabId)).toEqual(false);
      expect(subject.isCurrent(anotherTabId)).toEqual(true);
      expect(initialTabCb).toBeCalled();
      expect(anotherTabCb).toBeCalled();
    });

    it('does nothing when given the same tab ID', () => {
      subject.select(initialTabId);
      // when adding the first tab,
      // the subscribe method invokes the registered callback
      initialTabCb.mockClear();
      expect(subject.isCurrent(initialTabId)).toEqual(true);
      expect(subject.isCurrent(anotherTabId)).toEqual(false);
      expect(initialTabCb).not.toBeCalled();
      expect(anotherTabCb).not.toBeCalled();
    });
  });
});
