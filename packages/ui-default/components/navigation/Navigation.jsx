import React from 'react';
import { Menu } from 'semantic-ui-react';

export default function Navigation() {
  return (
    <Menu>
      <Menu.Item header>
        Hydro
      </Menu.Item>
      <Menu.Item
        name='problems'
        href='/p'
      >
        Problems
      </Menu.Item>
      <Menu.Item
        name='contests'
        href='/contest'
      >
        Contests
      </Menu.Item>
      <Menu.Item
        name='training'
        href='/training'
      >
        Training
      </Menu.Item>
      <Menu.Item
        name='discussion'
        href='/discuss'
      >
        Discussion
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <div className="ui search">
            <div className="ui icon input">
              <input className="prompt" type="text" placeholder="Search..." />
              <i className="search icon"></i>
            </div>
          </div>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
