import { mount } from 'enzyme';
import * as React from 'react';
import { promisify } from 'util';
import { TabContent, TabSelector, TabView } from '../';

describe('TabView', () => {
  const tabIds = ['tab_a', 'tab_b'];
  const buildWrapper = () =>
    mount(
      <TabView>
        <>
          <TabSelector tabId={tabIds[0]}>
            <p data-test={tabIds[0]}>{tabIds[0]}</p>
          </TabSelector>
          <TabSelector tabId={tabIds[1]}>
            <p data-test={tabIds[1]}>{tabIds[1]}</p>
          </TabSelector>
        </>
        <TabContent tabId={tabIds[0]}>
          <div data-test={tabIds[0]}>{tabIds[0]}</div>
        </TabContent>
        <TabContent tabId={tabIds[1]}>
          <div data-test={tabIds[1]}>{tabIds[1]}</div>
        </TabContent>
      </TabView>,
    );

  it('renders all tab selectors', () => {
    const wrapper = buildWrapper();
    expect(
      wrapper.find(TabSelector).find(`[data-test="${tabIds[0]}"]`),
    ).toHaveLength(1);
    expect(
      wrapper.find(TabSelector).find(`[data-test="${tabIds[1]}"]`),
    ).toHaveLength(1);
  });

  it('renders only the first TabContent as default', () => {
    const wrapper = buildWrapper();
    expect(
      wrapper.find(TabContent).find(`[data-test="${tabIds[0]}"]`),
    ).toHaveLength(1);
    expect(
      wrapper.find(TabContent).find(`[data-test="${tabIds[1]}"]`),
    ).toHaveLength(0);
  });

  it('switches the displaying TabContent', () => {
    const wrapper = buildWrapper();
    wrapper
      .find(TabSelector)
      .find({ tabId: tabIds[0] })
      .simulate('click');
    expect(
      wrapper.find(TabContent).find(`[data-test="${tabIds[0]}"]`),
    ).toHaveLength(1);
    expect(
      wrapper.find(TabContent).find(`[data-test="${tabIds[1]}"]`),
    ).toHaveLength(0);
    wrapper
      .find(TabSelector)
      .find({ tabId: tabIds[1] })
      .simulate('click');
    expect(
      wrapper.find(TabContent).find(`[data-test="${tabIds[0]}"]`),
    ).toHaveLength(0);
    expect(
      wrapper.find(TabContent).find(`[data-test="${tabIds[1]}"]`),
    ).toHaveLength(1);
  });
});
