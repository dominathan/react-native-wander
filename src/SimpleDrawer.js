import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import TabView from './TabView';

class SimpleDrawer extends Component {
  static propTypes = {
    navigationState: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
    this.setCurrentUser();
  }

  setCurrentUser() {
    AsyncStorage.getItem('user', (err, user) => {
      this.setState({user: JSON.parse(user)});
    })
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
      ref="navigation"
       open={state.open}
       onOpen={() => Actions.refresh({ key: state.key, open: true })}
       onClose={() => Actions.refresh({ key: state.key, open: false })}
       type="displace"
       content={<TabView user={this.state.user}/>}
       tapToClose={true}
       openDrawerOffset={0.2}
       panCloseMask={0.2}
       negotiatePan={true}
       style={drawerStyles}
       tweenHandler={(ratio) => ({
        main: { opacity: Math.max(0.54, 1 - ratio) }
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

const drawerStyles = {
  // drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
  // main: { paddingLeft: 3 },
};

export default SimpleDrawer;
