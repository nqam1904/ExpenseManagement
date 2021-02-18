import React, { Component } from 'react';
import {
   View,
   Text,
   StyleSheet,
   KeyboardAvoidingView,
   Image,
   ScrollView,
   Platform,
   TouchableOpacity,
   Alert,
} from 'react-native';
import Images from '../../res/image';
import { colors, fonts, screenWidth } from '../../res/style/theme';
import LoadingView from '../custom/LoadingView';
import StatusBarView from '../custom/StatusBarView';
import TextInputAnimated from '../custom/TextInputAnimated';

export default class SignUp extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         confirmPassword: '',
         fullname: '',
         dob: '',
         email: '',
         phone: '',
      };
   }
   componentDidUpdate(prevProps) {
      if (this.props.status !== null && this.props.status !== prevProps.status) {
         if (this.props.status === 'success') {
            Alert.alert('Thông báo', this.props.message);
         } else {
            Alert.alert('Thông báo', this.props.message);
         }
      }
      if (this.props.error !== null && this.props.error !== prevProps.error) {
         Alert.alert('Thông báo', this.props.error);
      }
   }
   //input text
   onChangeUsername = (text) => {
      this.setState({ username: text });
   };
   onChangeFullName = (text) => {
      this.setState({ fullname: text });
   };
   onChangeEmail = (text) => {
      this.setState({ email: text });
   };
   onChangeDOB = (date) => {
      this.setState({ dob: date });
   };
   onChangePhone = (text) => {
      this.setState({ phone: text });
   };
   onChangePassword = (text) => {
      this.setState({ password: text });
   };
   onChangeConfirmPassword = (text) => {
      this.setState({ confirmPassword: text });
   };
   ////clear text
   onClearUsername = () => {
      this.setState({ username: '' });
   };
   onClearFullName = () => {
      this.setState({ fullname: '' });
   };
   onClearEmail = () => {
      this.setState({ email: '' });
   };
   onClearPhone = () => {
      this.setState({ phone: '' });
   };
   onClearPassword = () => {
      this.setState({ password: '' });
   };
   onClearConfirmPassword = () => {
      this.setState({ confirmPassword: '' });
   };
   onPressSignUp = () => {
      const { username, password, confirmPassword, fullname, dob, email, phone } = this.state;
      if (
         username === '' ||
         password === '' ||
         confirmPassword === '' ||
         fullname === '' ||
         dob === '' ||
         email === '' ||
         phone === ''
      ) {
         Alert.alert('Lưu ý', 'Bạn phải nhập đẩy đủ thông tin đăng kí');
      } else {
         if (password !== confirmPassword) {
            Alert.alert('Lưu ý', 'Mật khẩu nhập lại không trùng khớp');
         } else {
            var date = new Date(dob.split('/').reverse().join('/')).toISOString();
            this.props.signupAction({
               username,
               password,
               confirmPassword,
               fullname,
               dob: date,
               email,
               phone,
            });
         }
      }
   };

   render() {
      return (
         <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <StatusBarView />
            <LoadingView visible={this.props.loading} />
            <Image source={Images.signup_logo} style={styles.logo} />
            <ScrollView
               showsVerticalScrollIndicator={false}
               style={styles.container}
               contentContainerStyle={{ flexGrow: 1 }}
               keyboardShouldPersistTaps="handled">
               <Text style={styles.txtSignup}>Đăng ký tài khoản</Text>

               <TextInputAnimated
                  label="Họ và tên"
                  style={styles.input}
                  value={this.state.fullname}
                  onChangeText={this.onChangeFullName}
                  onPressClear={this.onClearFullName}
               />
               <TextInputAnimated
                  label="Email"
                  style={styles.input}
                  value={this.state.email}
                  onChangeText={this.onChangeEmail}
                  onPressClear={this.onClearEmail}
               />
               <TextInputAnimated
                  label="Ngày sinh"
                  isDatePicker
                  style={styles.input}
                  value={String(this.state.dob)}
                  onDateChange={this.onChangeDOB}
               />

               <TextInputAnimated
                  label="Số điện thoại"
                  keyboardType="number-pad"
                  style={styles.input}
                  value={this.state.phone}
                  onChangeText={this.onChangePhone}
                  onPressClear={this.onClearPhone}
               />
               <TextInputAnimated
                  label="Tên đăng nhập"
                  style={styles.input}
                  value={this.state.username}
                  onChangeText={this.onChangeUsername}
                  onPressClear={this.onClearUsername}
               />
               <TextInputAnimated
                  isPassword
                  style={styles.input}
                  label="Mật khẩu"
                  value={this.state.password}
                  onChangeText={this.onChangePassword}
                  onPressClear={this.onClearPassword}
               />
               <TextInputAnimated
                  isPassword
                  style={styles.input}
                  label="Nhập lại mật khẩu"
                  value={this.state.confirmPassword}
                  onChangeText={this.onChangeConfirmPassword}
                  onPressClear={this.onClearConfirmPassword}
               />
               <TouchableOpacity style={styles.btnSignup} onPress={this.onPressSignUp}>
                  <Text style={styles.txtBtn}>Đăng ký</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={[styles.btnSignup, { backgroundColor: colors.cyan, marginBottom: 20 }]}
                  onPress={() => this.props.navigation.goBack()}>
                  <Text style={styles.txtBtn}>Quay lại đăng nhập</Text>
               </TouchableOpacity>
            </ScrollView>
         </KeyboardAvoidingView>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
   },
   logo: {
      width: screenWidth,
      height: screenWidth * 0.7,
      // resizeMode: 'contain',
   },
   txtSignup: {
      marginTop: 8,
      fontSize: 24,
      fontFamily: fonts.bold,
      color: colors.green1,
      textAlign: 'center',
   },
   input: {
      marginTop: 20,
   },
   btnSignup: {
      height: 44,
      backgroundColor: colors.blue,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 16,
      marginTop: 20,
      borderRadius: 50,
   },
   txtBtn: {
      fontSize: 18,
      color: colors.white,
      fontFamily: fonts.bold,
   },
});
