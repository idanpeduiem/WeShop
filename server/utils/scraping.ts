import axios from 'axios';
import * as cheerio from 'cheerio';
import Item from '../models/item';

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
axios.get('https://www.terminalx.com/collections/winter-sale?department_level=11220&product_type_level=11334&p=6')
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
            newProduct.price = price.split(' ')[0];
            const imgUrl = $(product).children('.img-link_29yX').find('.image_3k9y').attr('src');
            newProduct.image = imgUrl;
            products.push({...newProduct, department: '63c28d3ef9825993529bc5dc', category: '63ca6421f30d854df04f4d61'});
        }
      });
    console.log(products.map(p => Object.values(p)));
    console.log(products.length);

    return products;
})
.then(products => {
    products.forEach(product => {
        const item = new Item(product);
        // item.save();
    })
})
.catch(error => console.error(error));
