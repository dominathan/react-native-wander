import React, { PropTypes } from 'react';
import { ListView, StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import TabViewHeader from './components/TabViewHeader';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
  user: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333B42',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderWidth: 1,
  },
  listViewStyle: {
    flex: 1,
    marginTop: 25
  },
  rowButton: {
    color: '#8D8F90'
  },
  rowButtonContainer: {
    alignItems: 'flex-start',
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#8D8F90',
    paddingBottom: 10,
    width: 250
  },
  rowIcon: {
    marginLeft: 15,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30
  },
  rowItem: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    padding: 5
  }
});

const TabView = (props, context) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  const drawer = context.drawer;
  const routes = ds.cloneWithRows([
    {
      routeCallback: () => { drawer.close(); Actions.home({ type: 'reset' }); },
      name: 'Home',
      icon: 'home'
    },
    {
      routeCallback: () => { drawer.close(); Actions.friends({ type: 'reset' }); },
      name: 'Friends',
      icon: 'gears'
    },
    {
      routeCallback: () => { drawer.close(); Actions.myPlaces({ type: 'reset' }); },
      name: 'My Places',
      icon: 'map'
    },
    {
      routeCallback: () => { drawer.close(); Actions.groups({ type: 'reset' }); },
      name: 'Groups',
      icon: 'gears'
    },
    {
      routeCallback: () => { drawer.close(); Actions.notifications({ type: 'reset' }); },
      name: 'Notifications',
      icon: 'bell'
    },
    {
      routeCallback: () => { drawer.close(); Actions.help({ type: 'reset' }); },
      name: 'Get Help',
      icon: 'question-circle'
    },
    {
      routeCallback: () => { drawer.close(); Actions.settings({ type: 'reset' }); },
      name: 'Settings',
      icon: 'cogs'
    }
  ]);
  return (
    <View style={[styles.container, props.sceneStyle]}>
      <TabViewHeader user={props.user} drawer={drawer} />
      <ListView
        dataSource={routes}
        renderRow={(rowData) =>
          <View style={[styles.rowItem]}>
            <Text style={[styles.rowIcon]}><Icon name={rowData.icon} size={24} color={'#8D8F90'} /></Text>
            <View style={[styles.rowButtonContainer]}>
              <Button style={[styles.rowButton]} onPress={rowData.routeCallback}>{rowData.name}</Button>
            </View>
          </View>
        }
        style={styles.listViewStyle}
      />
    </View>
  );
};

TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

module.exports = TabView;
