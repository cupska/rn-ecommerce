import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const useCountdownTimer = ({ initialMinutes = 60 }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Total detik dari menit

  useEffect(() => {
    // Jika waktu sudah habis (0), hentikan interval
    if (timeLeft <= 0) return;

    // Atur interval setiap 1 detik
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Hapus interval ketika komponen di-unmount atau waktu habis
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Format waktu (dari detik) ke dalam jam, menit, dan detik
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours} : ${minutes < 10 ? "0" : ""}${minutes} : ${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return formatTime(timeLeft);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "black",
  },
});

export default useCountdownTimer;
