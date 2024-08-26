import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormValues } from "../../App";

function Member() {
  const [members, setMembers] = useState<FormValues[]>([]);
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [fullNameInput, setFullNameInput] = useState<string>("");
  const [addressInput, setAddressInput] = useState<string>("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/users");
      setMembers(response.data.slice(0, 10));
      console.log(response);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const addMember = async () => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        {
          "email": emailInput,
          "password": passwordInput,
          "name": fullNameInput,
            "avatar": addressInput,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Member added:", response);
      setMembers((prevMembers) => [...prevMembers, response.data]);
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
    console.log(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value);
    console.log(event.target.value);
  };
}

export default Member;
