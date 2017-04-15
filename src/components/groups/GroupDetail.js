import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { joinPublicGroup, joinPrivateGroup } from '../../services/apiActions';

export class GroupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.joinGroup = this.joinGroup.bind(this);
  }

  joinGroup(group) {
    console.log("THIS IS GROUP", group)
    if(group.publicGroup || !group.private) {
      //join public
      joinPublicGroup(group)
        .then((success) => { console.log("SUCCESS")})
        .catch((err) => { console.log("FAILURE")})

    } else {
      // join private
    }
  }

  render() {
    const { group } = this.props;
    return (
      <View style={styles.groupItem}>
        { group.myGroup && <Icon name='group' color='#8E8E8E' /> }
        { group.publicGroup  && <Icon name='lock-open' color='#8E8E8E' />}
        { group.privateGroup && <Icon name='lock' color='#8E8E8E' />}

        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => Actions.groupProfile({group: group})}>
            <Text style={styles.text}>
              {`${group.name}`}
            </Text>
            <Text style={styles.memberCount}>
              {`${group.memberCount} Members` }
            </Text>

          </TouchableOpacity>


          <TouchableOpacity style={styles.moveButtonsRight}>

          {
            group.publicGroup && <Button
              buttonStyle={styles.acceptJoinGroupRequestButton}
              title="JOIN"
              icon={{name: 'add', color: '#4296CC'}}
              backgroundColor='#FFF'
              color='#4296CC'
              borderRadius={1}
              onPress={() => this.joinGroup(group)}
            />
          }

          {
            group.privateGroup && <Button
              buttonStyle={styles.acceptJoinGroupRequestButton}
              title="REQUEST"
              icon={{name: 'add', color: '#4296CC'}}
              backgroundColor='#FFF'
              color='#4296CC'
              borderRadius={1}
            />
          }


          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  groupItem: {
    height: 45,
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 7,
    marginBottom: 5,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4296CC',
    fontWeight: '500'
  },
  memberCount: {
    color: '#8D8F90',
    fontSize: 12,
    paddingLeft: 10
  },
  acceptJoinGroupRequestButton: {
    borderWidth: 1,
    borderColor: '#4296CC',
    alignSelf: 'flex-end'
  },
  acceptJoinPlus: {
    color: '#4296CC',
    backgroundColor: '#4296CC'
  },
  moveButtonsRight: {
    flex: 1
  }
});
