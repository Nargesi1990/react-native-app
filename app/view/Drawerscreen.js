import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';

class DrawerScreen extends Component {
    constructor(props) {
        super(props);
    }    

  render () {
    return (
      <View>
        <ScrollView>
          <View>
            <View >
              <Text onPress={this.props.navigation.navigate('Home')}>
                Home
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}


export default DrawerScreen;