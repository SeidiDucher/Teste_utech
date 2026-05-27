import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        padding: 24, 
        backgroundColor: '#121214' 
    },
    logo: { 
        fontSize: 36, 
        fontWeight: 'bold', 
        color: '#FFF', 
        textAlign: 'center', 
        marginBottom: 8 
    },
    logoDetail: { 
        color: '#00b37e' 
    },
    subtitle: { 
        fontSize: 16, 
        color: '#c4c4cc', 
        textAlign: 'center', 
        marginBottom: 40 },
        inputContainer: { 
        width: '100%', 
        marginBottom: 16 
    },
    label: { 
        color: '#e1e1e6', 
        fontSize: 14, 
        marginBottom: 8, 
        fontWeight: '600' 
    },
    input: { 
        backgroundColor: '#202024', 
        color: '#FFF', 
        padding: 16, 
        borderRadius: 8, 
        fontSize: 16, 
        borderWidth: 1, 
        borderColor: '#323238' 
    },
    button: { 
        backgroundColor: '#00b37e', 
        padding: 16, 
        borderRadius: 8, 
        alignItems: 'center', 
        marginTop: 8, height: 56, 
        justifyContent: 'center' 
    },
    buttonDisabled: { 
        opacity: 0.5 
    },
    buttonText: { 
        color: '#FFF', 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
    errorText: { 
        color: '#f75a68', 
        textAlign: 'center', 
        marginBottom: 12,
        fontWeight: '500' 
    }
});
