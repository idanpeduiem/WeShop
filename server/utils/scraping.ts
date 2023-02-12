import axios from 'axios';
import * as cheerio from 'cheerio';
import Item from '../models/item';
import ItemStock from '../models/item-stock';

interface ItemFromScraping {
    description: string;
    price: string;
    image: string | undefined;
}

type FullItem = ItemFromScraping & {
    department: string;
    category: string;
}

export const performScraping =  () => 
axios.get('https://www.terminalx.com/kids/boys/shirts')
.then(res => {
    const $ = cheerio.load(res.data);
    const products: FullItem[] = [];
    let counter = 0;

    $('.listing-product_3mjp').each((i, product) => {
        const newProduct: ItemFromScraping = {description: '', price: '', image: ''};
        counter++;
        const name = $(product).children('.bottom_3-q0').find('.right_1o65').find('.title_3ZxJ').text();
        if(name) {
            newProduct.description = name;
            const price = $(product).children('.bottom_3-q0').find('.left_1yUs').find('.final-price_8CiX').text();
            newProduct.price = price.split(' ')[0].replace(',', '');
            const imgUrl = $(product).children('.img-link_29yX').find('.image_3k9y').attr('src');
            newProduct.image = imgUrl;
            products.push({...newProduct, department: '63c28d3ef9825993529bc5df', category: '63ca6421f30d854df04f4d60'});
        }
      });
    console.log(products.map(p => Object.values(p)));
    console.log(products.length);

    return products;
})
.then(products => {
    products.forEach(product => {
        const item = new Item(product);
        // item.save((err, result) => {
        //     if(err) {
        //         console.log(err);
        //     } else {
        //         const itemId = result._id;
        //         const itemStock = new ItemStock({item: itemId, size: '63c28b9acd242206e3c2d232', qunantity: 1});
        //         itemStock.save();
        //         const itemStock2 = new ItemStock({item: itemId, size: '63c28b9acd242206e3c2d233', qunantity: 3});
        //         itemStock2.save();
        //     }
        // });
    })
})
.catch(error => console.error(error));
