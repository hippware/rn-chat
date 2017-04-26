export default class extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}
            >
                <Image
                    style={{ left: 20.5 * coef }}
                    source={require('../../images/iconVisibility.png')}
                />
                <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    maxLength={20}
                    secureTextEntry={!this.state.showPassword}
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,0.75)"
                    style={styles.passwordInput}
                />
            </View>
        );
        {
            this.state.password != '' &&
                <Button
                    onPress={() =>
                        this.setState({
                            showPassword: !this.state.showPassword
                        })}
                    textStyle={styles.showHidePasswordText}
                    style={styles.showHidePassword}
                >
                    {this.state.showPassword ? 'Hide' : 'Show'}
                </Button>;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    center: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    text: { fontSize: 15 * k, fontFamily: 'Roboto-Regular', color: 'white' },
    policyText: {
        paddingTop: 10,
        color: 'rgb(38,30,47)',
        fontFamily: 'Roboto-Light',
        fontSize: 15
    },
    showHidePasswordText: {
        fontSize: 15 * k,
        fontFamily: 'Roboto-Regular',
        color: 'rgb(254,92,108)'
    },
    showHidePassword: {
        borderWidth: 0,
        borderRadius: 0,
        position: 'absolute',
        right: 20 * k,
        bottom: 3 * k,
        padding: 0
    },
    signUpButton: {
        position: 'absolute',
        bottom: 30 * k,
        left: 30 * k,
        right: 30 * k,
        height: 50 * k,
        borderWidth: 0,
        borderRadius: 2 * k,
        backgroundColor: 'rgb(254,92,108)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    login: {
        position: 'absolute',
        bottom: 40 * k,
        left: 20 * k,
        right: 20 * k,
        alignItems: 'center',
        justifyContent: 'center'
    },
    launchIcon: {
        top: 102 * k,
        width: 69 * k,
        height: 79 * k,
        resizeMode: 'contain'
    },
    activeDot: {
        backgroundColor: 'white',
        width: 12 * k,
        height: 12 * k,
        borderRadius: 6 * k,
        marginLeft: 5 * k,
        marginRight: 5 * k
    },
    dot: {
        backgroundColor: 'rgba(255,255,255,.26)',
        width: 12 * k,
        height: 12 * k,
        borderRadius: 6 * k,
        marginLeft: 5 * k,
        marginRight: 5 * k
    },
    tabContent: {
        top: 240 * k,
        fontSize: 18 * k,
        color: 'white',
        fontFamily: 'Roboto-Light',
        textAlign: 'center',
        paddingLeft: 52 * k,
        paddingRight: 52 * k
    },
    loginText: {
        top: 240 * k,
        fontSize: 18 * k,
        color: 'white',
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        paddingLeft: 52 * k,
        paddingRight: 52 * k
    },
    tabHeader: {
        top: 211 * k,
        fontSize: 30 * k,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Roboto-Regular'
    },
    signUpForm: {
        position: 'absolute',
        top: 240.4 * k,
        right: 30 * k,
        left: 30 * k,
        borderRadius: 2 * k,
        backgroundColor: 'rgba(255,255,255,0.12)'
    },
    agreeNote: {
        position: 'absolute',
        top: 465.1 * k,
        right: 36 * k,
        left: 36 * k
    },
    agreeNoteText: {
        fontSize: 13 * k,
        color: 'white',
        fontFamily: 'Roboto-Regular'
    },
    usernameInput: {
        flex: 1,
        height: 51 * k,
        left: (18 + 15.2) * k,
        right: 15.2 * k,
        color: 'rgba(255,255,255,0.75)',
        fontFamily: 'Roboto-Regular',
        fontSize: 18 * k
    },
    passwordInput: {
        flex: 1,
        height: 51 * k,
        left: 5 * k,
        right: 15.2 * k,
        color: 'rgba(255,255,255,0.75)',
        fontFamily: 'Roboto-Regular',
        fontSize: 18 * k
    },
    phoneInput: {
        flex: 1,
        height: 51 * k,
        left: (17 + 12.5) * k,
        right: 15.2 * k,
        color: 'rgba(255,255,255,0.75)',
        fontFamily: 'Roboto-Regular'
    },
    linkText: { fontSize: 13 * k, color: 'white', fontFamily: 'Roboto-Medium' },
    paginationStyle: { bottom: 170 * k }
});
