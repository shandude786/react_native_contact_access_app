import {
  View,
  Text,
  PermissionsAndroid,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import React from 'react';
import Contacts from 'react-native-contacts';
type Props = {};

const App = (props: Props) => {
  const [contactList, setContactList] = React.useState<Contacts.Contact[]>([]);

  const fetchContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        // work with contacts
        console.log('contacts list', contacts);
        setContactList(contacts);
      })
      .catch(e => {
        console.log('contacts error', e);
      });
  };
  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permission Grated', granted);
        fetchContacts();
        // Permissions granted, you can proceed to fetch SMS messages
      } else {
        console.log('Permission Denied', granted);
        // Permissions denied, handle the case where permissions are not granted
      }
    } catch (error) {
      console.log('Error', error);
      // Handle the error
    }
  };
  React.useEffect(() => {
    requestPermissions();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <FlatList
        data={contactList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                width: '90%',
                height: 70,
                alignSelf: 'center',
                borderWidth: 0.5,
                borderColor: '#fff',
                borderRadius: 10,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              // onPress={() => {
              //   navigation.navigate('ContactDetails', {
              //     data: item,
              //   });
              // }}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('./src/images/user.jpg')}
                  style={{width: 40, height: 40, marginLeft: 15}}
                />
                <View style={{padding: 10}}>
                  <Text style={{color: '#fff'}}>{item.displayName}</Text>
                  <Text style={{color: '#fff', marginTop: 4}}>
                    {item.phoneNumbers[0].number}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', paddingRight: 15}}>
                <TouchableOpacity
                // onPress={() => {
                //   const url = Communications.text(
                //     item.phoneNumbers[0].number,
                //   );
                // }}
                >
                  {/* <Image
                    source={require('./src/images/message.png')}
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: '#fff',
                      marginRight: 20,
                    }}
                  /> */}
                  <Text
                    style={{
                      // width: 24,
                      height: 24,
                      color: '#fff',
                      marginRight: 20,
                    }}>
                    Msg
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${item.phoneNumbers[0].number}`);
                  }}>
                  {/* <Image
                    source={require('./src/images/call.png')}
                    style={{width: 20, height: 20, tintColor: '#fff'}}
                  /> */}
                  <Text
                    style={{
                      // width: 24,
                      height: 24,
                      color: '#fff',
                      marginRight: 20,
                    }}>
                    Call
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#fff',
          position: 'absolute',
          right: 30,
          bottom: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        // onPress={() => {
        //   navigation.navigate('AddContact');
        // }}
      >
        <Image
          source={require('./src/images/plus.png')}
          style={{width: 24, height: 24}}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default App;
