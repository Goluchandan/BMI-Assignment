import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import { Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const BmiHistory = () => {
  const [userBmi, setUserBmi] = useState([]);
  const [userData, setUserData] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userid"));

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/signup");
    }
  }, [userId]);

  useEffect(() => {
    axios
      .get(`/calculate/${userId}/get/bmidata`)
      .then((data) => {
        console.log(data.data);
        setUserBmi(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  useEffect(() => {
    axios
      .get(`/api/auth/${userId}/get/signup`)
      .then((data) => {
        console.log("user", data.data);
        setUserData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <div>
      <div
        style={{
          width: "30%",
          border: "3px solid gray",
          marginLeft: "100px",
          padding: "10px",
          marginTop: "20px",
          borderRadius: "10px",
          backgroundColor: "gainsboro",
        }}
      >
        <h2 className="user_info">USER DETAILS</h2>
        <div className="user_Info_container">
          <div style={{ width: "100%" }}>
            <Image
              src="https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
              alt=""
              height="150px"
              width="150px"
              borderRadius="50%"
              className="profilePic"
            />
          </div>
          <div style={{ width: "100%" }}>
            <h1 className="profile">{userData.name}</h1>
            <h1 className="profile2">{userData.email}</h1>
          </div>
        </div>
      </div>
      <div></div>
      <Text
        bgGradient="linear(to-r,pink.500 , green.600, red.600)"
        bgClip="text"
        fontSize={"4xl"}
        fontWeight="extrabold"
      >
        Get your BMI Previous History
      </Text>
      <div>
        <table>
          <thead>
            <tr style={{ backgroundColor: "blueviolet", color: "white" }}>
              <th>SR. NO.</th>
              <th>HEIGHT</th>
              <th>WEIGHT</th>
              <th>BMI</th>
            </tr>
          </thead>
          <tbody>
            {userBmi.map((elem, index) => {
              return (
                <tr key={nanoid()}>
                  <td>{index + 1}</td>
                  <td>{elem.height}</td>
                  <td>{elem.weight}</td>
                  <td>{elem.bmi}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BmiHistory;
