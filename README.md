<h1 align="center">
  <a href="#"> WEB POS PROJECT </a>
</h1>

<h3 align="center">Managing sales of the store</h3>

<h4 align="center"> 
	<a href="https://rifkikesepara.github.io/WebProject2024-32Bit/">LIVE DEMO</a>
</h4>
<h4 align="center"> 
	 Status: On Progress
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#how-it-works">How it works</a> • 
 <a href="#tech-stack">Tech Stack</a> •  
 <a href="#summary">Summary</a>  •
 <a href="#screenshots">Screenshots</a> 
 <!-- •<a href="#author">Author</a>-->
</p>

## About

This project allows a store to manage and hold their sales and see the sales reports via this application.

---

## Features

- [x] Logging into the system with pre-defined user information
- [x] Seeing the current sales from the dashboard (both in the chart and the table)
- [x] Starting and ending a shift
- [x] Making a sale with registered products
- [x] Categorizing and sorting products.
- [x] Adding products to the facourites.
- [x] Showing more than 1000 products without pagination. (<a href="https://react-window.vercel.app/#/examples/grid/fixed-size">Fixed Size Grid</a>)
- [x] Indicating the payment as by card, by cash or both
- [x] Checking the returnable products from the receipt that have been requested.
- [x] Returning the selected products.
- [x] Showing the receipts about the sale and returning products.
- [x] Toggling theme between dark and light.
- [x] Changing the language of the application. (Turkish, English)
- [x] Showing the end of the day report (Z-Report)
- [ ] Showing the report about the shifts.

---

## How it works

This project uses mock API as the backend. If you want to change any data of a product or anything else you should check the JSON file in the directory of `{PROJECT_DIR}/public/`

### Pre-requisites

Before you begin, you will need to have the following tools installed on your machine:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)

#### Running the web application

```bash

# Clone this repository
$ git clone https://github.com/rifkikesepara/WebProject2024-32Bit.git

# Access the project folder in your terminal
$ cd WebProject2024-32Bit

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm start

# The application will open on the port: 3000 - go to http://localhost:3000

```

---

## Tech Stack

The following tools were used in the construction of the project:

#### **Platform** ([React](https://reactjs.org/))

- **[react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)**
- **[mui](https://mui.com/)**
- **[axios](https://github.com/axios/axios)**
- **[formik](https://formik.org/)**
- **[i18next](https://www.i18next.com/)**
- **[notistack](https://notistack.com/)**
- **[react-simple-keyboard](https://hodgef.com/simple-keyboard/demos/)**
- **[react-to-print](https://github.com/MatthewHerbst/react-to-print/tree/master)**
- **[react-window](https://react-window.vercel.app/#/examples/grid/fixed-size)**

> See the file [package.json](https://github.com/rifkikesepara/WebProject2024-32Bit/blob/master/package.json)

#### [](#)**Documentation**

To see the documentation about components, custom hooks, and utils you can check [here](docs/DOCUMENTATION.md)

---

## Summary

I have been working on this project for a couple of months now. This is my second journey with 32-Bit recruitment event. One of my main goals when I started this project was to make the design as minimalist and elegant as possible. One of the other ones was to make the functionality as simple as possible so that almost everyone could use the application without going through some learning process before starting to use it.

One of the biggest difficulties that I faced during the project was about the layout of the sales page. I did not want it to look too crowded with buttons or the other things. I wanted it to be as simple as it can be. During my period of making the project I almost changed the layout of it 6 times. They weren't simple and functional enough for me. I did lots of research about it. I visited different supermarkets and I think I got the closest one that is similiar to my imagination.

The other difficulty that I bared was connecting all of the product and sales data to each other. In the first place I was fetching the product data from A101' API directly. But I didn't know if they were gonna change the data layout or not. So I decided to store it in a JSON file instead of getting the latest data directly from their API. When I stored it I had to re-arrange them to make it suitable for my system. But that was a bad choice. Because whenever I wanted add the system new functinality, I had to re-arrange the data layout again. So connecting all the datas of the components to each other was kind of a frustrating process for me. But in the end, I finally got to get the most suitable format of it.

For a conculasion, I have learned so many new things about React from this project. Unlike the <a href="https://github.com/rifkikesepara/toyota32bitproject" target="_blank">project of the last year</a>, I paid attention to the optimization as well. I checked every component if it is being rendered unnecessarily or not. I have used the hooks that I hadn't used last year. As for the components, I have tried to make them as abstract as possible. So I can tell that it was a quite fun and teaching experince for me.

<!-- ## Author

<a href="https://www.linkedin.com/in/evelinsteiger/">
 <img style="border-radius: 50%;" src="https://media-exp1.licdn.com/dms/image/C4E03AQFY3bB4gWUEVw/profile-displayphoto-shrink_200_200/0/1638286563108?e=1651708800&v=beta&t=WQhkU4GF5vPmHiAb788WkvXJaXnyKhYz5oarqqcfGBA" width="70px;" alt="Evelin Steiger"/>
 <br />
 <p><b>Evelin Steiger</b></p></a>

[![Linkedin Badge](https://img.shields.io/badge/-Evelin%20Steiger-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/evelinsteiger/)](https://www.linkedin.com/in/evelinsteiger/) --->

---

## Screenshots

![Screenshot](https://github.com/rifkikesepara/WebProject2024-32Bit/assets/74590423/ccf60bc6-0f44-4b18-ad6b-686034af5b34)
![Screenshot](https://github.com/rifkikesepara/WebProject2024-32Bit/assets/74590423/1a3c7d5f-20c7-4c82-8832-347f44d6e382)
![Screenshot](https://github.com/rifkikesepara/WebProject2024-32Bit/assets/74590423/1d7321bb-8a26-4772-b393-5dc31149d66c)
![Screenshot](https://github.com/rifkikesepara/WebProject2024-32Bit/assets/74590423/0a31b528-2289-42dd-95fe-b05cb4349693)
![Screenshot](https://github.com/rifkikesepara/WebProject2024-32Bit/assets/74590423/3a9dbc2c-b946-4716-a49a-8d2779bf572e)
![Screenshot](https://github.com/rifkikesepara/WebProject2024-32Bit/assets/74590423/be3be7c5-7b9c-47c2-8b66-f14f1c7eef8a)
![Screenshot](https://github.com/rifkikesepara/WebProject2024-32Bit/assets/74590423/a3027387-9343-4803-b8ca-92d0e0d7cebf)
![Screenshot](https://github.com/rifkikesepara/WebProject2024-32Bit/assets/74590423/eb1e58e7-d88d-40ee-ac48-1716174c7937)
![Screenshot](https://github.com/rifkikesepara/WebProject2024-32Bit/assets/74590423/126167c1-a66a-4cca-af32-e324c25f2402)

---

## Learn More

This project was created and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
