import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormValues } from "../../App";

function PostRegister() {
  const [members, setMembers] = useState<FormValues[]>([]);
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [fullNameInput, setFullNameInput] = useState<string>("");
  const [avatarInput, setAvatarInput] = useState<string>("");

  const addMember = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        {
          "email": emailInput,
          "password": passwordInput,
          "fullName": fullNameInput,
            "avatar": avatarInput,
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

  return (
    <div>
      <h1>Todo</h1>
      <input
        type="email"
        value={emailInput}
        onChange={handleChangeEmail}
        placeholder="Enter your email"
      />
      <input
        type="password"
        value={passwordInput}
        onChange={handleChangePassword}
        placeholder="Enter your password"
      />
      <button onClick={addMember}>Submit</button>
      <h1>
        {members.map((member, id) => (
          <div key={id}>
            <h1>{member.fullName}</h1>
          </div>
        ))}
      </h1>
    </div>
  );
}

export default PostRegister;
