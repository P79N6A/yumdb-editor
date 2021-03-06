/*
 * Copyright (c) 2019-present, The Yumcoder Authors. All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import testUtil from "../testUtils";
import withState from "../withState";
import {act} from 'react-dom/test-utils'

it('test_with_state_primitive', () => {
    const getProps = testUtil(withState('state', 'setState', 0));

    expect(getProps().state).toEqual(0);
    act(() => getProps().setState(1));
    expect(getProps().state).toEqual(1)
});

it('test_with_state_obj', () => {
    const getProps = testUtil(withState('state', 'setState', {a: 1}));

    expect(getProps().state).toEqual({a: 1});
    act(() => getProps().setState({a: 2, c: 3}));
    expect(getProps().state).toEqual({a: 2, c: 3})
});

it('test_with_state_func', () => {
    let called = 0;
    const getProps = testUtil(
        withState('state', 'setState', () => {
            called += 1;
            return 0;
        })
    );

    expect(getProps().state).toEqual(0);
    act(() => getProps().setState(1));
    expect(getProps().state).toEqual(1);
    expect(called).toEqual(1);
});