import React, { useState, useRef } from "react";
import { View, TextInput, Button } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "./firebaseConfig";

export default function PhoneLogin() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  // Recaptcha для Expo
  const recaptchaVerifier = useRef(null);

  const sendCode = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const id = await provider.verifyPhoneNumber(phone, recaptchaVerifier.current);
      setVerificationId(id);
      alert("Код надіслано!");
    } catch (err) {
      alert("Помилка: " + err.message);
    }
  };

  const confirmCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, credential);
      alert("Вхід успішний!");
    } catch (err) {
      alert("Помилка: " + err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />

      <TextInput
        placeholder="Номер телефону (+380...)"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />

      <Button title="Надіслати код" onPress={sendCode} />

      <TextInput
        placeholder="Код з SMS"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        style={{ marginVertical: 10, borderBottomWidth: 1 }}
      />

      <Button title="Підтвердити" onPress={confirmCode} />
    </View>
  );
}
