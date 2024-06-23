require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create categories
  await prisma.category.createMany({
    data: [
      {
        name: "Fast Food",
        image:
          "https://as2.ftcdn.net/v2/jpg/05/78/04/13/1000_F_578041391_oUyqYAX3RQEkKLgetSyC1aCFmI1qovbN.jpg",
      },
      {
        name: "Italian Cuisine",
        image:
          "https://img.freepik.com/premium-vector/italian-food-logo-name-icon-symbol-vector-italy_526280-402.jpg",
      },
      {
        name: "Chinese Cuisine",
        image:
          "https://media.istockphoto.com/id/1172879542/vector/chinese-food-illustration-logo.jpg?s=612x612&w=0&k=20&c=OvuJcAijnf1AnZtxaDlcrhoZByBGIL00SBVDIMEG6Rc=",
      },
      {
        name: "Mexican Cuisine",
        image:
          "https://www.shutterstock.com/image-vector/mexican-food-logo-design-vector-600w-1315939574.jpg",
      },
      {
        name: "Desserts",
        image:
          "https://t4.ftcdn.net/jpg/01/29/47/01/360_F_129470188_ikoJs2dvvyQoQNfRt1QgUINKjklpUig3.jpg",
      },
    ],
  });

  console.log("Created categories.");

  // Fetch category IDs
  const categories = await prisma.category.findMany();
  const categoryMap = categories.reduce((map, category) => {
    map[category.name] = category.id;
    return map;
  }, {});

  const restaurantsData = [
    {
      name: "Burger Place",
      address: "123 Burger St.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-dmeaxgopCAoAoS3N9RwDIIgvij8khNYGUQ&s",
      categoryId: categoryMap["Fast Food"],
    },
    {
      name: "Chicken Spot",
      address: "456 Chicken Rd.",
      image:
        "https://img.freepik.com/premium-vector/happy-chicken-restaurant-logo_141211-3.jpg",
      categoryId: categoryMap["Fast Food"],
    },
    {
      name: "Pasta Bar",
      address: "789 Pasta Ave.",
      image:
        "https://thumbs.dreamstime.com/b/pasta-hand-written-lettering-logo-label-badge-emblem-modern-calligraphy-italian-food-vintage-retro-style-isolated-96256352.jpg",
      categoryId: categoryMap["Italian Cuisine"],
    },
    {
      name: "Pizza Corner",
      address: "321 Pizza Ln.",
      image: "https://img.freepik.com/premium-vector/pizza-logo_25327-260.jpg",
      categoryId: categoryMap["Italian Cuisine"],
    },
    {
      name: "Dragon Wok",
      address: "654 Dragon Way",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_DRxOtNBcBJJeqXROt2vfLTpoEb0mtOUNCA&s",
      categoryId: categoryMap["Chinese Cuisine"],
    },
    {
      name: "Panda Express",
      address: "987 Panda Blvd.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfG2III9zyAXXY1zMeYUaAn8d8kkVLVZt2_w&s",
      categoryId: categoryMap["Chinese Cuisine"],
    },
    {
      name: "Taco Fiesta",
      address: "234 Taco St.",
      image:
        "https://cdn.prod.website-files.com/6501d74c349ad4abddce6670/650877ba9d817463ec324ae3_MTTacoFestLOGOEDIT.png",
      categoryId: categoryMap["Mexican Cuisine"],
    },
    {
      name: "Cantina Mex",
      address: "567 Cantina Rd.",
      image:
        "https://www.spottedbylocals.com/zagreb/files/mex-cantina-zagreb-by-nevena-mikec-1.jpg",
      categoryId: categoryMap["Mexican Cuisine"],
    },
    {
      name: "Sweet Tooth",
      address: "890 Sweet St.",
      image:
        "https://upload.wikimedia.org/wikipedia/it/3/3f/Sweet_Tooth_Logo.png",
      categoryId: categoryMap["Desserts"],
    },
    {
      name: "Ice Cream Parlor",
      address: "123 Ice Cream Ave.",
      image:
        "https://i.pinimg.com/originals/f4/82/3f/f4823f9a0c712547d314065c86b6a904.png",
      categoryId: categoryMap["Desserts"],
    },
  ];

  for (const restaurant of restaurantsData) {
    const createdRestaurant = await prisma.restaurants.create({
      data: restaurant,
    });

    const dishesData = [
      {
        name: "Classic Dish",
        price: 10.0,
        image:
          "https://media.self.com/photos/57d8952a24fe9dae3283190b/master/w_1600%2Cc_limit/Slow-Cooker-Chili-31.jpg",
        restaurantId: createdRestaurant.id,
        categoryId: restaurant.categoryId,
      },
      {
        name: "Special Dish",
        price: 12.5,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSksKfd2y_EjxKcBMJDraWLE457oZphOZzZA&s",
        restaurantId: createdRestaurant.id,
        categoryId: restaurant.categoryId,
      },
      {
        name: "Vegetarian Dish",
        price: 9.5,
        image:
          "https://images.immediate.co.uk/production/volatile/sites/30/2021/05/Roast-Puttanesca-Aubergines-71a1fd8.jpg?quality=90&resize=556,505",
        restaurantId: createdRestaurant.id,
        categoryId: restaurant.categoryId,
      },
      {
        name: "Seafood Dish",
        price: 15.0,
        image:
          "https://www.foodandwine.com/thmb/ClPnka2WSnl5PtrMYOjlmXsXw1k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/escovitch-fish-FT-RECIPE0920-8a733638c2ba4b72b48737782fa616c2.jpg",
        restaurantId: createdRestaurant.id,
        categoryId: restaurant.categoryId,
      },
      {
        name: "Dessert",
        price: 7.0,
        image:
          "https://cdn.loveandlemons.com/wp-content/uploads/2021/06/summer-desserts.jpg",
        restaurantId: createdRestaurant.id,
        categoryId: restaurant.categoryId,
      },
    ];

    await prisma.dish.createMany({
      data: dishesData,
    });
  }

  console.log("Restaurants and dishes created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
