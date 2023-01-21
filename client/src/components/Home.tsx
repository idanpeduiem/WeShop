import { Button, Card } from "@mui/material";
import { useUserContext } from "../controller/userController/userContext";
import ItemCard from "./common/ItemCard";
import AxiosInstance from "../utils/axiosInstance";

import './Home.css';

const data = [
  {
    name:'חולצה יפה',
    price:39.90,
    imageUrl:"https://media.terminalx.com/pub/media/catalog/product/cache/92af6b9c945798a7e3b64d91033084b3/x/6/x644920001-11670828458.jpg"
  },
  {
    name:'חולצה יפה',
    price:39.90,
    imageUrl:"https://media.terminalx.com/pub/media/catalog/product/cache/92af6b9c945798a7e3b64d91033084b3/x/6/x644920001-11670828458.jpg"
  },
  {
    name:'חולצה יפה',
    price:39.90,
    imageUrl:"https://media.terminalx.com/pub/media/catalog/product/cache/92af6b9c945798a7e3b64d91033084b3/x/6/x644920001-11670828458.jpg"
  },
  {
    name:'חולצה יפה',
    price:39.90,
    imageUrl:"https://media.terminalx.com/pub/media/catalog/product/cache/92af6b9c945798a7e3b64d91033084b3/x/6/x644920001-11670828458.jpg"
  },
  {
    name:'חולצה יפה',
    price:39.90,
    imageUrl:"https://media.terminalx.com/pub/media/catalog/product/cache/92af6b9c945798a7e3b64d91033084b3/x/6/x644920001-11670828458.jpg"
  },
  {
    name:'חולצה יפה',
    price:39.90,
    imageUrl:"https://media.terminalx.com/pub/media/catalog/product/cache/92af6b9c945798a7e3b64d91033084b3/x/6/x644920001-11670828458.jpg"
  },
  {
    name:'חולצה יפה',
    price:39.90,
    imageUrl:"https://media.terminalx.com/pub/media/catalog/product/cache/92af6b9c945798a7e3b64d91033084b3/x/6/x644920001-11670828458.jpg"
  },
  {
    name:'חולצה יפה',
    price:39.90,
    imageUrl:"https://media.terminalx.com/pub/media/catalog/product/cache/92af6b9c945798a7e3b64d91033084b3/x/6/x644920001-11670828458.jpg"
  },
  {
    name:'חולצה יפה',
    price:39.90,
    imageUrl:"https://media.terminalx.com/pub/media/catalog/product/cache/92af6b9c945798a7e3b64d91033084b3/x/6/x644920001-11670828458.jpg"
  },
  {
    name:'חולצה יפה',
    price:39.90,
    imageUrl:"https://media.terminalx.com/pub/media/catalog/product/cache/92af6b9c945798a7e3b64d91033084b3/x/6/x644920001-11670828458.jpg"
  },
  {
    name:'חולצה יפה',
    price:39.90,
    imageUrl:"https://media.terminalx.com/pub/media/catalog/product/cache/92af6b9c945798a7e3b64d91033084b3/x/6/x644920001-11670828458.jpg"
  },
]

const Home = () => {
  const { user } = useUserContext();
  console.log(user);
  console.log("callApi");
  const getData = async () => {
    try {
      const data = await AxiosInstance.get("/");
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  getData();

  return (
    <div className="HomeContainer">
      <div className="title">פריטים לרכישה</div>
      <div className="content">
        <Card className="filtersContainer">
          <div>מסננים:</div>
          <div className="genderFilter">
            <Button variant="text">גברים</Button>
            <Button variant="text">נשים</Button>
            <Button variant="text">ילדים</Button>
          </div>

          <div>סינונים נוספים:</div>
          <div className="genderFilter">
            <Button variant="text">חולצות</Button>
            <Button variant="text">מכנסיים</Button>
            <Button variant="text">נעליים</Button>
          </div>
        </Card>
        <Card className="itemsContainer">
          {data.map(item => {
            const { name, price, imageUrl} = item;
            return( 
              <ItemCard 
                key={name}
                name={name}
                price={price}
                imageUrl={imageUrl}/>
            )
          })}
        </Card>
      </div>
    </div>
  );
};

export default Home;
