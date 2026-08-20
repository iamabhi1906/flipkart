const categories = [
  {
    name: 'Beauty & Personal Care',
    description:
      'Products for skincare, haircare, cosmetics, grooming, hygiene, fragrance, and personal appearance.',
    subcategories: [
      {
        name: 'Skincare',
        description:
          'Products designed to cleanse, moisturize, protect, and maintain the appearance and condition of the skin.',
        subcategories: [
          {
            name: 'Face Cleansers',
            description:
              'Products formulated to remove dirt, oil, makeup, and other impurities from facial skin.',
          },
          {
            name: 'Face Moisturizers',
            description:
              'Products designed to hydrate facial skin and support a comfortable, smooth, and moisturized appearance.',
          },
          {
            name: 'Face Serums',
            description:
              'Concentrated skincare products designed to provide targeted cosmetic care for specific skin concerns.',
          },
          {
            name: 'Face Masks',
            description:
              'Skincare preparations applied to the face for cleansing, hydration, conditioning, or cosmetic treatment.',
          },
          {
            name: 'Body Care',
            description:
              'Products designed for cleansing, moisturizing, exfoliating, and maintaining the appearance of skin on the body.',
          },
        ],
      },
      {
        name: 'Hair Care',
        description:
          'Products used for cleansing, conditioning, styling, maintaining, and improving the appearance of hair.',
        subcategories: [
          {
            name: 'Shampoo',
            description:
              'Hair-cleansing products designed to remove oil, dirt, styling residue, and other buildup from the hair and scalp.',
          },
          {
            name: 'Conditioner',
            description:
              'Haircare products designed to improve softness, manageability, smoothness, and conditioning after cleansing.',
          },
          {
            name: 'Hair Oil',
            description:
              'Oil-based haircare products used for conditioning, grooming, styling, and maintaining the appearance of hair.',
          },
          {
            name: 'Hair Styling',
            description:
              'Products used to shape, hold, smooth, texturize, or otherwise style hair.',
          },
          {
            name: 'Hair Color',
            description:
              'Products designed to temporarily or permanently change the visible color of hair.',
          },
        ],
      },
      {
        name: 'Makeup',
        description:
          'Cosmetic products used to enhance, define, color, or alter the appearance of facial features and skin.',
        subcategories: [
          {
            name: 'Face Makeup',
            description:
              'Cosmetic products used to create an even-looking complexion and enhance the appearance of facial skin.',
          },
          {
            name: 'Eye Makeup',
            description:
              'Cosmetic products designed to define and enhance the appearance of the eyes and surrounding areas.',
          },
          {
            name: 'Lip Makeup',
            description:
              'Cosmetic products designed to add color, shine, definition, or conditioning to the lips.',
          },
          {
            name: 'Makeup Brushes',
            description:
              'Brushes and applicator tools designed for applying, blending, shaping, and finishing cosmetic products.',
          },
          {
            name: 'Makeup Accessories',
            description:
              'Supporting products such as cosmetic bags, mirrors, organizers, sponges, sharpeners, and other makeup tools.',
          },
        ],
      },
      {
        name: 'Fragrance',
        description:
          'Scented personal products designed to provide fragrance for the body, clothing, or personal environment.',
        subcategories: [
          {
            name: 'Perfumes',
            description:
              'Fragrance products designed for personal application and available in a variety of scent profiles.',
          },
          {
            name: 'Eau de Toilette',
            description:
              'Lighter fragrance formulations designed for personal use and everyday scent application.',
          },
          {
            name: 'Body Mists',
            description:
              'Lightly scented body products intended to provide a refreshing fragrance experience.',
          },
          {
            name: 'Attars',
            description:
              'Concentrated fragrance oils traditionally used as personal perfumes and available in diverse botanical and aromatic profiles.',
          },
          {
            name: 'Deodorants',
            description:
              'Personal-care products designed to provide freshness and reduce or mask unwanted body odor.',
          },
        ],
      },
    ],
  },
  {
    name: 'Grocery & Food',
    description:
      'Food, beverages, pantry products, ingredients, snacks, packaged foods, and everyday grocery essentials.',
    subcategories: [
      {
        name: 'Fresh Produce',
        description:
          'Fresh fruits, vegetables, herbs, and other plant-based food products intended for household consumption.',
        subcategories: [
          {
            name: 'Fresh Fruits',
            description:
              'Whole fresh fruits available for direct consumption, cooking, juicing, desserts, and food preparation.',
          },
          {
            name: 'Fresh Vegetables',
            description:
              'Fresh vegetables used for cooking, salads, side dishes, soups, and general food preparation.',
          },
          {
            name: 'Leafy Greens',
            description:
              'Fresh leafy vegetables commonly used in salads, cooking, soups, and traditional food preparations.',
          },
          {
            name: 'Fresh Herbs',
            description:
              'Aromatic fresh plants used to flavor, garnish, and enhance prepared foods and beverages.',
          },
          {
            name: 'Mushrooms',
            description:
              'Edible mushroom varieties sold fresh for cooking, food preparation, and culinary applications.',
          },
        ],
      },
      {
        name: 'Staples',
        description:
          'Common pantry ingredients used as foundational components of everyday meals and cooking.',
        subcategories: [
          {
            name: 'Rice',
            description:
              'Rice varieties used for everyday meals, regional dishes, specialty cooking, and food preparation.',
          },
          {
            name: 'Wheat & Flour',
            description:
              'Wheat products and flour varieties used for breads, flatbreads, baking, snacks, and general cooking.',
          },
          {
            name: 'Pulses',
            description:
              'Dried legumes and pulse products commonly used as sources of protein and as ingredients in everyday meals.',
          },
          {
            name: 'Grains',
            description:
              'Whole and processed grains used for cooking, baking, breakfast foods, and traditional recipes.',
          },
          {
            name: 'Cooking Oils',
            description:
              'Edible oils used for frying, sautéing, baking, dressing, and general food preparation.',
          },
        ],
      },
      {
        name: 'Snacks',
        description:
          'Ready-to-eat and packaged foods consumed between meals or during leisure and social occasions.',
        subcategories: [
          {
            name: 'Chips & Crisps',
            description:
              'Crunchy packaged snack foods commonly made from potatoes, grains, vegetables, or other ingredients.',
          },
          {
            name: 'Biscuits & Cookies',
            description:
              'Baked snack products available in sweet, savory, filled, cream, plain, and specialty varieties.',
          },
          {
            name: 'Namkeen',
            description:
              'Savory Indian snack foods made from grains, pulses, nuts, spices, and other ingredients.',
          },
          {
            name: 'Nuts & Seeds',
            description:
              'Edible nuts and seeds sold as snacks, cooking ingredients, toppings, or baking ingredients.',
          },
          {
            name: 'Popcorn',
            description:
              'Corn-based snack products available as ready-to-eat popcorn or kernels intended for preparation at home.',
          },
        ],
      },
      {
        name: 'Beverages',
        description:
          'Drinks and beverage products including hot drinks, cold drinks, juices, packaged water, and drink mixes.',
        subcategories: [
          {
            name: 'Tea',
            description:
              'Tea leaves, tea bags, blends, and flavored tea products prepared as hot or cold beverages.',
          },
          {
            name: 'Coffee',
            description:
              'Coffee beans, ground coffee, instant coffee, and related products used to prepare coffee beverages.',
          },
          {
            name: 'Juices',
            description:
              'Fruit and vegetable juice products available in fresh, packaged, concentrated, or ready-to-drink formats.',
          },
          {
            name: 'Soft Drinks',
            description:
              'Carbonated and non-carbonated packaged beverages intended for refreshment and everyday consumption.',
          },
          {
            name: 'Drink Mixes',
            description:
              'Powders, concentrates, syrups, and other products designed to be mixed with water or other beverages.',
          },
        ],
      },
    ],
  },
  {
    name: 'Baby & Kids',
    description:
      'Products designed for babies, toddlers, children, and families, covering feeding, clothing, nursery, toys, travel, and everyday care.',
    subcategories: [
      {
        name: 'Baby Clothing',
        description:
          'Comfort-focused garments designed for infants and young children for everyday, sleeping, outdoor, and special-occasion use.',
        subcategories: [
          {
            name: 'Baby Bodysuits',
            description:
              'One-piece infant garments designed for comfortable everyday wear and convenient dressing.',
          },
          {
            name: 'Baby Sleepwear',
            description:
              'Comfortable clothing designed for infants and young children during sleep and rest.',
          },
          {
            name: 'Baby Rompers',
            description:
              'One-piece baby garments designed for everyday wear, play, and comfortable movement.',
          },
          {
            name: 'Baby Jackets',
            description:
              'Outer garments designed to provide additional warmth and protection for babies and young children.',
          },
          {
            name: 'Baby Socks',
            description:
              "Small soft socks designed to keep babies' feet comfortable and protected.",
          },
        ],
      },
      {
        name: 'Baby Feeding',
        description:
          'Products and accessories used for feeding babies and young children.',
        subcategories: [
          {
            name: 'Baby Bottles',
            description:
              'Feeding bottles designed for infants and young children and available in different sizes, materials, and designs.',
          },
          {
            name: 'Bottle Accessories',
            description:
              'Bottle-related products such as nipples, caps, cleaning accessories, and replacement components.',
          },
          {
            name: 'Baby Spoons',
            description:
              'Small feeding utensils designed for babies transitioning to assisted or independent eating.',
          },
          {
            name: 'Baby Bowls',
            description:
              'Small food containers designed for serving meals, snacks, and prepared foods to babies and toddlers.',
          },
          {
            name: 'Feeding Bibs',
            description:
              'Protective garments worn during feeding to help reduce food and liquid spills on clothing.',
          },
        ],
      },
      {
        name: 'Nursery',
        description:
          "Furniture, accessories, and organizational products designed for infant and children's rooms.",
        subcategories: [
          {
            name: 'Baby Cribs',
            description:
              "Dedicated infant sleeping furniture designed for use in nurseries and children's sleeping spaces.",
          },
          {
            name: 'Baby Mattresses',
            description:
              'Mattresses designed for compatible infant and nursery sleeping furniture.',
          },
          {
            name: 'Changing Tables',
            description:
              'Nursery furniture designed to provide an organized surface for changing and caring for babies.',
          },
          {
            name: 'Nursery Storage',
            description:
              'Storage furniture and organizers designed for baby clothing, toys, diapers, accessories, and nursery supplies.',
          },
          {
            name: 'Nursery Decor',
            description:
              "Decorative products designed to personalize and enhance infant and children's rooms.",
          },
        ],
      },
      {
        name: 'Baby Travel',
        description:
          'Products designed to help parents safely and conveniently travel with infants and young children.',
        subcategories: [
          {
            name: 'Strollers',
            description:
              'Wheeled child transport products designed for moving babies and young children during walks, travel, and daily activities.',
          },
          {
            name: 'Baby Car Seats',
            description:
              'Child restraint systems designed for transporting infants and children in vehicles.',
          },
          {
            name: 'Baby Carriers',
            description:
              'Wearable carriers designed to allow adults to carry babies and young children while keeping hands relatively free.',
          },
          {
            name: 'Travel Cribs',
            description:
              'Portable sleeping enclosures designed for infants and young children during travel and temporary stays.',
          },
          {
            name: 'Diaper Bags',
            description:
              'Organized bags designed to carry diapers, feeding supplies, clothing, hygiene products, and other baby essentials.',
          },
        ],
      },
    ],
  },
  {
    name: 'Toys & Games',
    description:
      'Entertainment, educational, creative, collectible, construction, and recreational products designed primarily for children, families, and hobbyists.',
    subcategories: [
      {
        name: 'Educational Toys',
        description:
          'Toys designed to encourage learning, problem-solving, creativity, observation, memory, and development of age-appropriate skills.',
        subcategories: [
          {
            name: 'Learning Kits',
            description:
              'Activity kits containing materials and components designed around educational concepts and guided learning activities.',
          },
          {
            name: 'Science Toys',
            description:
              'Toys and kits that introduce children to scientific concepts through experiments, models, demonstrations, and interactive activities.',
          },
          {
            name: 'Math Toys',
            description:
              'Educational toys designed to introduce counting, arithmetic, patterns, shapes, measurements, and mathematical reasoning.',
          },
          {
            name: 'Language Toys',
            description:
              'Educational products designed to support vocabulary, reading, spelling, communication, and language-learning activities.',
          },
          {
            name: 'Puzzle Toys',
            description:
              'Problem-solving toys that require children to recognize patterns, manipulate pieces, or reason through challenges.',
          },
        ],
      },
      {
        name: 'Building Toys',
        description:
          'Construction-based toys that allow users to assemble structures, models, vehicles, characters, and creative designs.',
        subcategories: [
          {
            name: 'Building Blocks',
            description:
              'Interlocking or stackable pieces used to create structures, objects, and imaginative designs.',
          },
          {
            name: 'Construction Sets',
            description:
              'Multi-piece toy systems designed to build detailed models and structures according to instructions or free-form designs.',
          },
          {
            name: 'Magnetic Building Toys',
            description:
              'Construction toys using magnetic components that connect to create geometric structures and creative models.',
          },
          {
            name: 'Model Building Kits',
            description:
              'Kits containing components for assembling detailed models of vehicles, buildings, machines, characters, or other subjects.',
          },
          {
            name: 'Engineering Toys',
            description:
              'Construction and mechanical toys designed to introduce principles of engineering, mechanics, structures, and problem-solving.',
          },
        ],
      },
      {
        name: 'Board Games',
        description:
          'Tabletop games played using boards, cards, pieces, dice, tokens, or combinations of game components.',
        subcategories: [
          {
            name: 'Family Board Games',
            description:
              'Accessible tabletop games designed for mixed-age family groups and casual recreational play.',
          },
          {
            name: 'Strategy Board Games',
            description:
              'Games emphasizing planning, resource management, tactics, decision-making, and strategic thinking.',
          },
          {
            name: 'Kids Board Games',
            description:
              "Age-appropriate tabletop games designed around simple rules, learning, entertainment, and children's social play.",
          },
          {
            name: 'Party Games',
            description:
              'Group-oriented games designed for social gatherings, parties, celebrations, and casual entertainment.',
          },
          {
            name: 'Classic Games',
            description:
              'Traditional and widely recognized tabletop games with established rules and long-standing popularity.',
          },
        ],
      },
      {
        name: 'Outdoor Toys',
        description:
          'Toys designed for active play, recreation, exploration, and entertainment in outdoor environments.',
        subcategories: [
          {
            name: 'Ride-On Toys',
            description:
              'Child-oriented wheeled or rideable toys designed for recreational movement and imaginative outdoor play.',
          },
          {
            name: 'Outdoor Play Sets',
            description:
              'Multi-component play equipment and sets designed for active outdoor entertainment.',
          },
          {
            name: 'Water Play Toys',
            description:
              'Toys designed for recreational water play in appropriate supervised environments.',
          },
          {
            name: 'Flying Toys',
            description:
              'Toys designed to fly, glide, or be launched through the air during recreational play.',
          },
          {
            name: 'Sports Toys',
            description:
              'Child-friendly recreational equipment inspired by sports such as balls, bats, hoops, goals, and related play products.',
          },
        ],
      },
    ],
  },
  {
    name: 'Sports & Fitness',
    description:
      'Equipment, apparel, accessories, and recreational products for exercise, training, competitive sports, outdoor activities, and active lifestyles.',
    subcategories: [
      {
        name: 'Fitness Equipment',
        description:
          'Exercise equipment designed for strength training, cardiovascular exercise, flexibility, mobility, and general fitness.',
        subcategories: [
          {
            name: 'Treadmills',
            description:
              'Indoor exercise machines designed for walking, jogging, and running workouts.',
          },
          {
            name: 'Exercise Bikes',
            description:
              'Stationary cycling equipment designed for indoor cardiovascular exercise and fitness training.',
          },
          {
            name: 'Elliptical Trainers',
            description:
              'Stationary exercise machines providing low-impact cardiovascular workouts through elliptical movement.',
          },
          {
            name: 'Rowing Machines',
            description:
              'Indoor fitness equipment designed to simulate rowing movements for cardiovascular and full-body exercise.',
          },
          {
            name: 'Home Gyms',
            description:
              'Multi-function exercise systems combining multiple resistance-training stations into a single fitness setup.',
          },
        ],
      },
      {
        name: 'Strength Training',
        description:
          'Equipment and accessories used for resistance training, muscle conditioning, and strength-focused workouts.',
        subcategories: [
          {
            name: 'Dumbbells',
            description:
              'Handheld weights used for resistance exercises targeting individual or multiple muscle groups.',
          },
          {
            name: 'Barbells',
            description:
              'Long weighted bars used for compound and strength-training exercises.',
          },
          {
            name: 'Weight Plates',
            description:
              'Weighted plates designed to be attached to compatible bars or equipment for resistance training.',
          },
          {
            name: 'Kettlebells',
            description:
              'Cast or manufactured weights with handles designed for swings, presses, carries, and other functional strength exercises.',
          },
          {
            name: 'Resistance Bands',
            description:
              'Elastic resistance equipment used for strength, mobility, rehabilitation-oriented exercise, and functional training.',
          },
        ],
      },
      {
        name: 'Running',
        description:
          'Products designed for running, jogging, road training, track activities, and recreational endurance exercise.',
        subcategories: [
          {
            name: 'Running Shoes',
            description:
              'Athletic footwear designed specifically for running and related forms of repetitive-impact exercise.',
          },
          {
            name: 'Running Clothing',
            description:
              'Lightweight athletic apparel designed for comfort and movement during running and endurance activities.',
          },
          {
            name: 'Running Accessories',
            description:
              'Supporting products such as running belts, hydration accessories, visibility products, and storage solutions.',
          },
          {
            name: 'Running Bags',
            description:
              'Compact bags and packs designed to carry personal essentials during running and jogging activities.',
          },
          {
            name: 'Race Accessories',
            description:
              'Products used for organized running events, race preparation, participation, identification, and personal organization.',
          },
        ],
      },
      {
        name: 'Cycling',
        description:
          'Bicycles, cycling equipment, clothing, accessories, and maintenance products for recreational and performance cycling.',
        subcategories: [
          {
            name: 'Road Bikes',
            description:
              'Bicycles designed primarily for paved-road riding, speed, endurance, commuting, and road cycling.',
          },
          {
            name: 'Mountain Bikes',
            description:
              'Bicycles designed for off-road riding, trails, uneven terrain, and recreational mountain cycling.',
          },
          {
            name: 'City Bikes',
            description:
              'Bicycles designed for practical urban transportation, commuting, leisure riding, and everyday mobility.',
          },
          {
            name: 'Cycling Helmets',
            description:
              'Protective headgear designed for bicycle riding and cycling activities.',
          },
          {
            name: 'Cycling Accessories',
            description:
              'Products such as lights, locks, pumps, bottles, bags, mounts, tools, and other cycling equipment.',
          },
        ],
      },
    ],
  },
  {
    name: 'Electronics',
    description:
      'Electronic products and equipment used for communication, computing, entertainment, productivity, connectivity, and everyday technology needs.',
    subcategories: [
      {
        name: 'Mobile Phones',
        description:
          'Portable communication devices ranging from basic phones to advanced smartphones designed for calls, messaging, internet access, applications, photography, and entertainment.',
        subcategories: [
          {
            name: 'Smartphones',
            description:
              'Advanced mobile phones featuring operating systems, application support, internet connectivity, cameras, multimedia capabilities, and touchscreen interfaces.',
          },
          {
            name: 'Feature Phones',
            description:
              'Simple mobile phones primarily designed for voice calls, text messaging, basic multimedia functions, and long battery life.',
          },
          {
            name: 'Gaming Phones',
            description:
              'High-performance smartphones optimized for mobile gaming with powerful processors, advanced graphics, high-refresh-rate displays, cooling systems, and gaming-oriented features.',
          },
          {
            name: 'Rugged Phones',
            description:
              'Durable mobile phones designed to withstand demanding environments, drops, dust, water exposure, and heavy everyday use.',
          },
          {
            name: 'Foldable Phones',
            description:
              'Smartphones featuring flexible displays and folding mechanisms that provide compact portability or expanded screen space.',
          },
        ],
      },
      {
        name: 'Mobile Accessories',
        description:
          'Accessories and supporting products designed to protect, charge, mount, connect, customize, or enhance mobile phones.',
        subcategories: [
          {
            name: 'Phone Cases',
            description:
              'Protective covers designed to reduce damage from scratches, impacts, drops, and everyday handling.',
          },
          {
            name: 'Screen Protectors',
            description:
              'Protective films and tempered glass products designed to protect smartphone displays from scratches, fingerprints, and minor impacts.',
          },
          {
            name: 'Chargers',
            description:
              'Power adapters and charging devices used to recharge mobile phones and compatible electronic devices.',
          },
          {
            name: 'Power Banks',
            description:
              'Portable rechargeable batteries designed to provide additional electrical power to mobile phones and other USB-powered devices.',
          },
          {
            name: 'Phone Holders',
            description:
              'Mounting and holding accessories designed to securely position smartphones on desks, vehicles, bicycles, motorcycles, or other surfaces.',
          },
        ],
      },
      {
        name: 'Computers',
        description:
          'Computing hardware designed for personal, educational, professional, business, creative, and entertainment applications.',
        subcategories: [
          {
            name: 'Laptops',
            description:
              'Portable computers designed for mobile productivity, education, business, entertainment, communication, and general computing.',
          },
          {
            name: 'Desktop Computers',
            description:
              'Stationary computer systems designed for offices, homes, educational environments, professional applications, and general-purpose computing.',
          },
          {
            name: 'Gaming Computers',
            description:
              'High-performance desktop or portable computer systems equipped with powerful processors, graphics hardware, memory, and cooling solutions for gaming.',
          },
          {
            name: 'Workstations',
            description:
              'Professional-grade computer systems designed for demanding engineering, scientific, design, animation, architecture, data analysis, and content-creation workloads.',
          },
          {
            name: 'Mini PCs',
            description:
              'Compact computer systems designed to provide desktop computing capabilities in small physical enclosures for offices, homes, media centers, and specialized applications.',
          },
        ],
      },
      {
        name: 'Computer Components',
        description:
          'Internal and external hardware components used to build, upgrade, repair, or expand computer systems.',
        subcategories: [
          {
            name: 'Processors',
            description:
              'Central processing units responsible for executing instructions and performing computational operations within computers.',
          },
          {
            name: 'Graphics Cards',
            description:
              'Dedicated graphics processing hardware used for gaming, visualization, video processing, machine learning, rendering, and other graphics-intensive workloads.',
          },
          {
            name: 'Memory',
            description:
              'Computer memory modules used to provide temporary working storage for operating systems, applications, and active processes.',
          },
          {
            name: 'Storage Drives',
            description:
              'Hardware devices used to permanently store operating systems, applications, documents, media, databases, and other digital information.',
          },
          {
            name: 'Computer Power Supplies',
            description:
              'Power conversion units that provide regulated electrical power to computer components.',
          },
        ],
      },
      {
        name: 'Computer Peripherals',
        description:
          'External hardware devices used to interact with computers, improve productivity, provide input and output capabilities, or enhance the computing experience.',
        subcategories: [
          {
            name: 'Keyboards',
            description:
              'Input devices containing physical or virtual keys used for typing text, entering commands, gaming, and controlling computers.',
          },
          {
            name: 'Mice',
            description:
              'Pointing devices used to control computer interfaces, select objects, navigate applications, and perform precise movements.',
          },
          {
            name: 'Webcams',
            description:
              'Digital cameras designed to capture video for online meetings, streaming, recording, communication, and content creation.',
          },
          {
            name: 'Computer Speakers',
            description:
              'External audio devices designed to provide sound output from computers for music, videos, gaming, meetings, and other multimedia applications.',
          },
          {
            name: 'USB Hubs',
            description:
              'Connectivity devices that expand the number of available USB ports on computers and compatible electronic devices.',
          },
        ],
      },
      {
        name: 'Monitors',
        description:
          'Display devices used with computers, gaming systems, professional workstations, and entertainment equipment.',
        subcategories: [
          {
            name: 'Office Monitors',
            description:
              'Computer displays designed for productivity tasks such as documents, spreadsheets, browsing, communication, and general office work.',
          },
          {
            name: 'Gaming Monitors',
            description:
              'High-performance displays designed for gaming with features such as high refresh rates, low response times, adaptive synchronization, and gaming-oriented image settings.',
          },
          {
            name: 'Professional Monitors',
            description:
              'Displays designed for professional photography, video editing, graphic design, engineering, publishing, and other color-sensitive workloads.',
          },
          {
            name: 'Ultrawide Monitors',
            description:
              'Wide-format computer displays offering expanded horizontal workspace for multitasking, gaming, productivity, and immersive applications.',
          },
          {
            name: 'Portable Monitors',
            description:
              'Lightweight external displays designed to provide additional screen space for laptops, mobile workstations, gaming devices, and travel.',
          },
        ],
      },
      {
        name: 'Audio Equipment',
        description:
          'Electronic products designed for listening to, recording, processing, amplifying, and distributing audio.',
        subcategories: [
          {
            name: 'Headphones',
            description:
              'Personal audio devices designed to deliver sound directly to the listener through over-ear, on-ear, or other headphone designs.',
          },
          {
            name: 'Earbuds',
            description:
              'Compact personal listening devices designed for portable music, calls, media playback, and everyday audio use.',
          },
          {
            name: 'Bluetooth Speakers',
            description:
              'Wireless portable or stationary speakers that receive audio through Bluetooth and other compatible wireless technologies.',
          },
          {
            name: 'Soundbars',
            description:
              'Compact speaker systems designed primarily to improve television and home entertainment audio while occupying limited space.',
          },
          {
            name: 'Home Audio Systems',
            description:
              'Integrated or component-based audio systems designed for music playback and entertainment in residential environments.',
          },
        ],
      },
      {
        name: 'Cameras',
        description:
          'Digital imaging equipment used for photography, video recording, surveillance, content creation, and specialized visual applications.',
        subcategories: [
          {
            name: 'Mirrorless Cameras',
            description:
              'Interchangeable-lens digital cameras that use electronic displays or viewfinders without a traditional optical mirror system.',
          },
          {
            name: 'DSLR Cameras',
            description:
              'Interchangeable-lens digital cameras using a reflex mirror and optical viewfinder system for photography and video production.',
          },
          {
            name: 'Compact Cameras',
            description:
              'Small integrated-lens cameras designed for convenient photography and video recording without interchangeable lenses.',
          },
          {
            name: 'Action Cameras',
            description:
              'Compact rugged cameras designed to capture video and photographs during sports, travel, outdoor activities, and physically demanding environments.',
          },
          {
            name: 'Instant Cameras',
            description:
              'Cameras designed to produce physical photographs shortly after images are captured.',
          },
        ],
      },
      {
        name: 'Televisions',
        description:
          'Large-screen electronic displays and television systems designed for broadcast viewing, streaming, gaming, movies, and home entertainment.',
        subcategories: [
          {
            name: 'LED TVs',
            description:
              'Flat-panel televisions using LED-backlit LCD display technology for television broadcasts, streaming, gaming, and general entertainment.',
          },
          {
            name: 'OLED TVs',
            description:
              'Televisions using individually controlled organic light-emitting pixels to produce high contrast and deep black levels.',
          },
          {
            name: 'QLED TVs',
            description:
              'Televisions using quantum-dot-enhanced display technology to improve brightness and color performance.',
          },
          {
            name: 'Smart TVs',
            description:
              'Internet-connected televisions capable of running streaming applications, accessing online services, and connecting with smart devices.',
          },
          {
            name: 'Large Screen TVs',
            description:
              'Large-format televisions designed for immersive home entertainment, viewing rooms, presentations, and media spaces.',
          },
        ],
      },
      {
        name: 'Gaming Electronics',
        description:
          'Electronic hardware and accessories designed specifically for interactive gaming across consoles, computers, handheld devices, and entertainment systems.',
        subcategories: [
          {
            name: 'Gaming Consoles',
            description:
              'Dedicated electronic gaming systems designed to run interactive video games and related entertainment applications.',
          },
          {
            name: 'Handheld Gaming Devices',
            description:
              'Portable gaming systems designed to provide dedicated or general-purpose gaming experiences while traveling or away from a television.',
          },
          {
            name: 'Gaming Controllers',
            description:
              'Input devices designed to control games and interact with gaming consoles, computers, mobile devices, and other compatible systems.',
          },
          {
            name: 'Gaming Headsets',
            description:
              'Headphones equipped with microphones and gaming-oriented features for game audio, communication, voice chat, and immersive play.',
          },
          {
            name: 'Gaming Accessories',
            description:
              'Supporting products such as charging docks, controller grips, stands, cables, storage solutions, and other gaming enhancements.',
          },
        ],
      },
    ],
  },
  {
    name: 'Clothing',
    description:
      'Apparel and garments for men, women, children, and different lifestyles, seasons, activities, occasions, and fashion preferences.',
    subcategories: [
      {
        name: "Men's Clothing",
        description:
          'Garments designed for men, including casualwear, formalwear, traditional apparel, workwear, sportswear, and seasonal clothing.',
        subcategories: [
          {
            name: 'Shirts',
            description:
              "Men's upper-body garments available in formal, casual, business, printed, checked, striped, denim, and everyday styles.",
          },
          {
            name: 'T-Shirts',
            description:
              'Casual short-sleeved or long-sleeved upper-body garments available in plain, graphic, printed, athletic, and fashion-oriented designs.',
          },
          {
            name: 'Trousers',
            description:
              "Men's lower-body garments including formal trousers, casual trousers, chinos, and other everyday styles.",
          },
          {
            name: 'Jeans',
            description:
              'Durable denim trousers available in different fits, washes, rises, colors, and contemporary or traditional designs.',
          },
          {
            name: 'Jackets',
            description:
              'Outerwear garments designed for warmth, protection, fashion, travel, casual wear, and seasonal conditions.',
          },
          {
            name: 'Suits',
            description:
              'Formal coordinated clothing sets generally consisting of matching jackets and trousers designed for professional, ceremonial, and formal occasions.',
          },
        ],
      },
      {
        name: "Women's Clothing",
        description:
          "Women's apparel covering casual, formal, professional, traditional, festive, seasonal, and contemporary fashion requirements.",
        subcategories: [
          {
            name: 'Dresses',
            description:
              "One-piece women's garments available in casual, formal, party, evening, summer, office, and occasion-specific styles.",
          },
          {
            name: 'Tops',
            description:
              "Women's upper-body garments including casual tops, formal tops, blouses, tunics, crop tops, and fashion styles.",
          },
          {
            name: 'Trousers',
            description:
              "Women's lower-body garments including formal trousers, casual pants, wide-leg trousers, straight-fit styles, and fashion designs.",
          },
          {
            name: 'Jeans',
            description:
              "Women's denim trousers available in multiple fits, washes, rises, colors, and contemporary fashion designs.",
          },
          {
            name: 'Skirts',
            description:
              "Women's lower-body garments available in mini, midi, maxi, pleated, straight, flared, formal, and casual designs.",
          },
          {
            name: 'Jackets',
            description:
              "Women's outerwear designed for fashion, warmth, protection, travel, work, and seasonal use.",
          },
        ],
      },
      {
        name: 'Indian Traditional Clothing',
        description:
          'Traditional and culturally inspired garments commonly worn across India for everyday use, religious occasions, celebrations, festivals, weddings, and formal events.',
        subcategories: [
          {
            name: 'Sarees',
            description:
              'Traditional South Asian garments consisting of a long fabric drape styled around the body and available in numerous regional fabrics, patterns, and designs.',
          },
          {
            name: 'Kurtas',
            description:
              'Traditional and contemporary tunic-style garments worn by men and women for casual, formal, festive, and everyday occasions.',
          },
          {
            name: 'Salwar Suits',
            description:
              "Traditional women's clothing sets generally consisting of a tunic, lower garment, and coordinating scarf or dupatta.",
          },
          {
            name: 'Lehengas',
            description:
              "Traditional South Asian women's outfits commonly consisting of a flared skirt, blouse or choli, and dupatta, frequently worn for weddings and celebrations.",
          },
          {
            name: 'Sherwanis',
            description:
              "Formal traditional South Asian men's garments commonly worn during weddings, celebrations, cultural events, and ceremonial occasions.",
          },
        ],
      },
      {
        name: 'Kids Clothing',
        description:
          'Clothing designed for infants, toddlers, children, and young people across casual, school, festive, seasonal, and activity-specific needs.',
        subcategories: [
          {
            name: 'Boys Clothing',
            description:
              'Apparel designed for boys including shirts, T-shirts, trousers, jeans, jackets, ethnic wear, and occasion clothing.',
          },
          {
            name: 'Girls Clothing',
            description:
              'Apparel designed for girls including dresses, tops, skirts, trousers, ethnic wear, jackets, and occasion clothing.',
          },
          {
            name: 'Baby Clothing',
            description:
              'Soft and practical clothing designed for infants with attention to comfort, ease of dressing, and age-appropriate construction.',
          },
          {
            name: 'School Clothing',
            description:
              'Clothing intended for school environments including uniforms, formal school garments, sweaters, jackets, and related apparel.',
          },
          {
            name: 'Kids Sleepwear',
            description:
              'Comfortable nightwear and sleep garments designed for infants, toddlers, children, and young people.',
          },
        ],
      },
      {
        name: 'Sportswear',
        description:
          'Performance-oriented and casual athletic clothing designed for exercise, sports, training, outdoor activities, and active lifestyles.',
        subcategories: [
          {
            name: 'Sports T-Shirts',
            description:
              'Athletic upper-body garments designed for training, running, gym activities, team sports, and general exercise.',
          },
          {
            name: 'Track Pants',
            description:
              'Comfortable athletic trousers designed for warm-ups, training, travel, casual wear, and sports activities.',
          },
          {
            name: 'Sports Shorts',
            description:
              'Lightweight lower-body garments designed for running, training, gym workouts, team sports, and recreational activities.',
          },
          {
            name: 'Sports Jackets',
            description:
              'Athletic outerwear designed to provide warmth, weather protection, mobility, and comfort during physical activity.',
          },
          {
            name: 'Team Jerseys',
            description:
              'Sports shirts and jerseys inspired by or designed for organized teams, clubs, leagues, and recreational sports.',
          },
        ],
      },
    ],
  },
  {
    name: 'Footwear',
    description:
      'Shoes, sandals, boots, slippers, and specialized footwear designed for everyday use, fashion, work, sports, outdoor activities, and different age groups.',
    subcategories: [
      {
        name: "Men's Footwear",
        description:
          'Footwear designed for men across casual, formal, professional, athletic, outdoor, and traditional requirements.',
        subcategories: [
          {
            name: 'Formal Shoes',
            description:
              "Traditional and contemporary men's shoes designed for business, professional, ceremonial, and formal occasions.",
          },
          {
            name: 'Casual Shoes',
            description:
              "Everyday men's footwear designed for comfort, leisure, travel, social activities, and casual outfits.",
          },
          {
            name: 'Sports Shoes',
            description:
              'Performance and athletic shoes designed for exercise, running, training, recreational sports, and active lifestyles.',
          },
          {
            name: 'Sandals',
            description:
              'Open footwear designed for warm weather, casual use, travel, outdoor activities, and everyday comfort.',
          },
          {
            name: 'Boots',
            description:
              'Enclosed footwear extending above the ankle and designed for fashion, work, outdoor activities, protection, and weather conditions.',
          },
        ],
      },
      {
        name: "Women's Footwear",
        description:
          'Footwear designed for women across fashion, casual, professional, formal, athletic, traditional, and everyday uses.',
        subcategories: [
          {
            name: 'Heels',
            description:
              "Women's shoes with raised heels designed for formal events, professional settings, fashion, and special occasions.",
          },
          {
            name: 'Flats',
            description:
              "Low-heeled or flat women's footwear designed for comfort, everyday use, work, travel, and casual styling.",
          },
          {
            name: "Women's Sneakers",
            description:
              "Casual and athletic-inspired women's footwear designed for walking, everyday activities, travel, and relaxed fashion.",
          },
          {
            name: "Women's Sandals",
            description:
              "Open women's footwear designed for warm weather, casual occasions, travel, everyday use, and fashion.",
          },
          {
            name: "Women's Boots",
            description:
              "Women's enclosed footwear designed for fashion, warmth, outdoor use, travel, and seasonal conditions.",
          },
        ],
      },
      {
        name: 'Kids Footwear',
        description:
          'Footwear designed for infants, toddlers, children, and young people with emphasis on comfort, durability, fit, and age-appropriate use.',
        subcategories: [
          {
            name: 'School Shoes',
            description:
              "Durable children's footwear designed for school uniforms, classrooms, walking, and everyday school activities.",
          },
          {
            name: 'Kids Sneakers',
            description:
              "Casual and athletic shoes designed for children's everyday activities, play, walking, and sports.",
          },
          {
            name: 'Kids Sandals',
            description:
              "Open children's footwear designed for warm weather, casual use, outdoor activities, and everyday comfort.",
          },
          {
            name: 'Baby Shoes',
            description:
              'Small and soft footwear designed for infants and early walkers with emphasis on comfort and gentle construction.',
          },
          {
            name: 'Kids Boots',
            description:
              "Enclosed children's footwear designed for warmth, outdoor activities, seasonal conditions, and fashion.",
          },
        ],
      },
    ],
  },
  {
    name: 'Home & Kitchen',
    description:
      'Products used for furnishing, organizing, cleaning, cooking, dining, decorating, maintaining, and improving residential spaces.',
    subcategories: [
      {
        name: 'Furniture',
        description:
          'Functional and decorative furnishings used in bedrooms, living rooms, dining areas, offices, entryways, and other residential spaces.',
        subcategories: [
          {
            name: 'Sofas',
            description:
              'Upholstered seating furniture designed for living rooms, lounges, family rooms, offices, and entertainment spaces.',
          },
          {
            name: 'Beds',
            description:
              'Bedroom furniture designed to support mattresses and provide a dedicated sleeping surface.',
          },
          {
            name: 'Wardrobes',
            description:
              'Storage furniture designed to organize and store clothing, accessories, household items, and personal belongings.',
          },
          {
            name: 'Dining Tables',
            description:
              'Tables designed for eating meals and gathering in dining rooms, kitchens, breakfast areas, and multipurpose spaces.',
          },
          {
            name: 'Office Furniture',
            description:
              'Furniture designed for home offices, workspaces, study areas, and professional environments.',
          },
        ],
      },
      {
        name: 'Kitchenware',
        description:
          'Tools, utensils, containers, cookware, and equipment used for food preparation, cooking, serving, and kitchen organization.',
        subcategories: [
          {
            name: 'Cookware',
            description:
              'Pots, pans, pressure cookware, and other vessels used to prepare food through cooking methods such as boiling, frying, sautéing, and baking.',
          },
          {
            name: 'Kitchen Utensils',
            description:
              'Handheld tools used for preparing, mixing, cutting, serving, and handling food.',
          },
          {
            name: 'Food Storage',
            description:
              'Containers and organizational products designed to store ingredients, prepared foods, leftovers, and dry goods.',
          },
          {
            name: 'Dinnerware',
            description:
              'Plates, bowls, serving dishes, and related tableware used for serving and eating food.',
          },
          {
            name: 'Glassware',
            description:
              'Drinking and serving vessels made from glass or similar materials for water, beverages, and dining.',
          },
        ],
      },
      {
        name: 'Home Decor',
        description:
          'Decorative products used to personalize, beautify, organize, and enhance the visual atmosphere of residential interiors.',
        subcategories: [
          {
            name: 'Wall Decor',
            description:
              'Decorative items designed for walls, including artwork, frames, signs, clocks, mirrors, and ornamental pieces.',
          },
          {
            name: 'Decorative Lighting',
            description:
              'Lighting products selected primarily for decorative impact while providing ambient or accent illumination.',
          },
          {
            name: 'Rugs',
            description:
              'Textile floor coverings used to add comfort, warmth, visual interest, and defined areas within rooms.',
          },
          {
            name: 'Curtains',
            description:
              'Window coverings designed to control light, privacy, insulation, and interior decoration.',
          },
          {
            name: 'Decorative Accessories',
            description:
              'Small decorative objects such as figurines, vases, ornaments, trays, and accent pieces used to enhance interiors.',
          },
        ],
      },
      {
        name: 'Cleaning Supplies',
        description:
          'Products and tools used to clean, sanitize, maintain, and organize household surfaces and living spaces.',
        subcategories: [
          {
            name: 'Floor Cleaning',
            description:
              'Products and tools designed specifically for cleaning and maintaining floors made from tile, wood, stone, laminate, vinyl, and other materials.',
          },
          {
            name: 'Bathroom Cleaning',
            description:
              'Cleaning products and tools intended for toilets, showers, sinks, tiles, tubs, and other bathroom surfaces.',
          },
          {
            name: 'Kitchen Cleaning',
            description:
              'Products designed to clean countertops, sinks, appliances, cooking areas, utensils, and other kitchen surfaces.',
          },
          {
            name: 'Laundry Supplies',
            description:
              'Products used for washing, treating, drying, organizing, and maintaining clothing and household textiles.',
          },
          {
            name: 'Cleaning Tools',
            description:
              'Manual and mechanical tools such as brushes, mops, brooms, dusters, squeegees, and cleaning accessories.',
          },
        ],
      },
    ],
  },
  {
    name: 'Automotive',
    description:
      'Vehicles, replacement components, maintenance products, accessories, equipment, and supplies for cars, motorcycles, and other road vehicles.',
    subcategories: [
      {
        name: 'Car Parts',
        description:
          'Replacement and upgrade components designed for passenger cars and other compatible automobiles.',
        subcategories: [
          {
            name: 'Engine Parts',
            description:
              'Mechanical and electrical components used in automobile engines for operation, maintenance, repair, and replacement.',
          },
          {
            name: 'Brake Parts',
            description:
              'Components used in vehicle braking systems to provide controlled slowing and stopping.',
          },
          {
            name: 'Suspension Parts',
            description:
              'Components that support vehicle suspension systems and contribute to ride characteristics, handling, and wheel movement.',
          },
          {
            name: 'Electrical Parts',
            description:
              'Automotive electrical components used for starting, charging, lighting, signaling, control, and vehicle electronics.',
          },
          {
            name: 'Body Parts',
            description:
              'Exterior and structural replacement components used to repair or restore vehicle bodywork.',
          },
        ],
      },
      {
        name: 'Car Accessories',
        description:
          'Products designed to improve vehicle convenience, organization, appearance, comfort, protection, and functionality.',
        subcategories: [
          {
            name: 'Car Floor Mats',
            description:
              'Protective floor coverings designed to reduce dirt, moisture, wear, and debris inside vehicle cabins.',
          },
          {
            name: 'Seat Covers',
            description:
              'Protective and decorative coverings designed to fit over vehicle seats and help protect upholstery.',
          },
          {
            name: 'Car Organizers',
            description:
              'Storage products designed to keep personal belongings, documents, tools, and accessories organized inside vehicles.',
          },
          {
            name: 'Car Phone Mounts',
            description:
              'Mounting accessories designed to position compatible smartphones securely within a vehicle.',
          },
          {
            name: 'Car Sun Shades',
            description:
              'Window coverings designed to reduce sunlight exposure and help manage heat and glare inside parked vehicles.',
          },
        ],
      },
      {
        name: 'Car Care',
        description:
          'Cleaning, maintenance, detailing, protection, and appearance products used for automobiles.',
        subcategories: [
          {
            name: 'Car Wash Products',
            description:
              'Cleaning products designed for washing exterior vehicle surfaces and removing dirt and road contaminants.',
          },
          {
            name: 'Car Polish',
            description:
              'Surface-care products designed to improve the appearance and finish of painted automotive surfaces.',
          },
          {
            name: 'Interior Cleaners',
            description:
              'Cleaning products formulated for dashboards, upholstery, plastics, carpets, and other vehicle interior surfaces.',
          },
          {
            name: 'Tire Care',
            description:
              'Products used to clean, maintain, protect, and improve the appearance of vehicle tires.',
          },
          {
            name: 'Car Detailing Tools',
            description:
              'Brushes, cloths, applicators, machines, and other tools used for detailed vehicle cleaning and appearance maintenance.',
          },
        ],
      },
      {
        name: 'Motorcycles',
        description:
          'Motorcycles, components, accessories, maintenance products, and equipment for two-wheeled motor vehicles.',
        subcategories: [
          {
            name: 'Motorcycle Parts',
            description:
              'Replacement and performance components designed for motorcycles and compatible two-wheeled motor vehicles.',
          },
          {
            name: 'Motorcycle Accessories',
            description:
              'Products designed to improve motorcycle convenience, storage, appearance, comfort, and functionality.',
          },
          {
            name: 'Motorcycle Luggage',
            description:
              'Bags, cases, panniers, and storage systems designed for carrying belongings on motorcycles.',
          },
          {
            name: 'Motorcycle Covers',
            description:
              'Protective covers designed to shield motorcycles from dust, sunlight, moisture, and environmental exposure.',
          },
          {
            name: 'Motorcycle Maintenance',
            description:
              'Tools, cleaning products, lubricants, and maintenance supplies used to service and care for motorcycles.',
          },
        ],
      },
    ],
  },
  {
    name: 'Tools & Hardware',
    description:
      'Hand tools, power tools, workshop equipment, fasteners, hardware, measuring equipment, and products used for construction, maintenance, repair, and fabrication.',
    subcategories: [
      {
        name: 'Hand Tools',
        description:
          'Manually operated tools used for cutting, fastening, gripping, measuring, assembling, repairing, and general workshop tasks.',
        subcategories: [
          {
            name: 'Screwdrivers',
            description:
              'Hand tools designed to drive, remove, and adjust screws and compatible fasteners.',
          },
          {
            name: 'Wrenches',
            description:
              'Hand tools designed to grip, tighten, loosen, and adjust nuts, bolts, and other fasteners.',
          },
          {
            name: 'Pliers',
            description:
              'Hand tools with opposing jaws designed for gripping, bending, cutting, holding, and manipulating materials.',
          },
          {
            name: 'Hammers',
            description:
              'Impact tools designed for driving, striking, shaping, assembling, demolition, and other workshop tasks.',
          },
          {
            name: 'Cutting Tools',
            description:
              'Manual tools designed to cut materials such as metal, wood, plastic, wire, and other workpieces.',
          },
        ],
      },
      {
        name: 'Power Tools',
        description:
          'Motor-powered tools used for drilling, cutting, grinding, sanding, fastening, polishing, and construction tasks.',
        subcategories: [
          {
            name: 'Drills',
            description:
              'Powered tools designed to create holes in materials and perform related drilling and fastening tasks.',
          },
          {
            name: 'Grinders',
            description:
              'Powered tools used for grinding, cutting, sharpening, polishing, and surface preparation.',
          },
          {
            name: 'Circular Saws',
            description:
              'Powered cutting tools using rotating blades to make straight cuts in compatible materials.',
          },
          {
            name: 'Jigsaws',
            description:
              'Powered saws designed to make curved, straight, and detailed cuts in suitable materials.',
          },
          {
            name: 'Sanders',
            description:
              'Powered tools designed to smooth, prepare, finish, or refinish material surfaces.',
          },
        ],
      },
      {
        name: 'Hardware',
        description:
          'Small components and fastening products used for construction, furniture assembly, repairs, installation, and general maintenance.',
        subcategories: [
          {
            name: 'Screws',
            description:
              'Threaded fasteners used to join, secure, or attach materials and components.',
          },
          {
            name: 'Nuts & Bolts',
            description:
              'Threaded fastening components used together or with compatible hardware to create secure mechanical connections.',
          },
          {
            name: 'Nails',
            description:
              'Driven fasteners commonly used to join wood, construction materials, and other compatible surfaces.',
          },
          {
            name: 'Hinges',
            description:
              'Mechanical hardware components that allow doors, cabinets, lids, gates, and other objects to pivot or swing.',
          },
          {
            name: 'Brackets',
            description:
              'Hardware components used to support, mount, reinforce, or connect structures and objects.',
          },
        ],
      },
      {
        name: 'Measuring Tools',
        description:
          'Tools and instruments used to determine dimensions, angles, levels, distances, and other physical measurements.',
        subcategories: [
          {
            name: 'Measuring Tapes',
            description:
              'Flexible graduated measuring devices used to measure lengths, widths, heights, and distances.',
          },
          {
            name: 'Levels',
            description:
              'Tools used to determine whether surfaces or objects are horizontally or vertically aligned.',
          },
          {
            name: 'Calipers',
            description:
              'Precision measuring instruments used to determine internal, external, or depth dimensions.',
          },
          {
            name: 'Laser Measures',
            description:
              'Electronic measuring devices that use laser technology to determine distances.',
          },
          {
            name: 'Angle Measuring Tools',
            description:
              'Tools designed to determine, transfer, or verify angles during construction, woodworking, fabrication, and installation.',
          },
        ],
      },
    ],
  },
  {
    name: 'Garden & Outdoor',
    description:
      'Products for gardening, landscaping, outdoor living, plant care, yard maintenance, and recreational outdoor spaces.',
    subcategories: [
      {
        name: 'Gardening Tools',
        description:
          'Manual and powered tools used for planting, pruning, digging, cultivating, trimming, and maintaining gardens.',
        subcategories: [
          {
            name: 'Garden Shovels',
            description:
              'Digging and soil-handling tools designed for planting, transplanting, excavation, and garden maintenance.',
          },
          {
            name: 'Pruning Tools',
            description:
              'Cutting tools designed for trimming branches, stems, shrubs, plants, and other garden growth.',
          },
          {
            name: 'Garden Rakes',
            description:
              'Tools designed to collect leaves, spread soil, level garden materials, and perform other garden maintenance tasks.',
          },
          {
            name: 'Garden Hoes',
            description:
              'Hand tools designed for cultivating soil, removing weeds, making planting furrows, and preparing garden beds.',
          },
          {
            name: 'Garden Tool Sets',
            description:
              'Collections of complementary hand tools assembled for common planting, cultivation, pruning, and maintenance tasks.',
          },
        ],
      },
      {
        name: 'Plant Care',
        description:
          'Products used to grow, support, water, nourish, protect, and maintain plants in indoor and outdoor environments.',
        subcategories: [
          {
            name: 'Plant Pots',
            description:
              'Containers designed for growing and displaying plants indoors, on balconies, patios, gardens, and other spaces.',
          },
          {
            name: 'Planters',
            description:
              'Decorative or functional containers designed for cultivating plants and arranging outdoor or indoor greenery.',
          },
          {
            name: 'Plant Supports',
            description:
              'Structures and accessories used to support climbing, flowering, or structurally weak plants.',
          },
          {
            name: 'Watering Equipment',
            description:
              'Cans, hoses, sprinklers, nozzles, and related equipment used to provide water to plants and landscaped areas.',
          },
          {
            name: 'Garden Soil',
            description:
              'Growing media and soil products intended for containers, garden beds, planting, and landscaping.',
          },
        ],
      },
      {
        name: 'Outdoor Furniture',
        description:
          'Furniture designed for gardens, patios, balconies, terraces, outdoor dining areas, and recreational spaces.',
        subcategories: [
          {
            name: 'Outdoor Chairs',
            description:
              'Seating furniture designed for patios, gardens, balconies, terraces, and other outdoor areas.',
          },
          {
            name: 'Outdoor Tables',
            description:
              'Tables designed for outdoor dining, entertaining, gardening activities, and general outdoor use.',
          },
          {
            name: 'Garden Benches',
            description:
              'Long-form outdoor seating designed for gardens, pathways, patios, parks, and recreational spaces.',
          },
          {
            name: 'Outdoor Sofas',
            description:
              'Cushioned or structured seating systems designed for outdoor relaxation and social spaces.',
          },
          {
            name: 'Outdoor Storage',
            description:
              'Storage products designed to organize and protect outdoor tools, equipment, cushions, gardening supplies, and accessories.',
          },
        ],
      },
      {
        name: 'Outdoor Recreation',
        description:
          'Products designed for leisure, recreation, camping, exploration, and entertainment in outdoor environments.',
        subcategories: [
          {
            name: 'Camping Equipment',
            description:
              'Equipment used for temporary outdoor stays, camping trips, recreation, and outdoor living.',
          },
          {
            name: 'Hiking Equipment',
            description:
              'Products designed to support walking, hiking, trekking, navigation, hydration, and outdoor exploration.',
          },
          {
            name: 'Picnic Equipment',
            description:
              'Products used for outdoor meals, gatherings, food transport, seating, and recreational picnics.',
          },
          {
            name: 'Outdoor Lighting',
            description:
              'Portable and fixed lighting products designed for gardens, paths, camping areas, patios, and other outdoor environments.',
          },
          {
            name: 'Outdoor Games',
            description:
              'Recreational games and equipment intended for active outdoor play, social gatherings, and leisure activities.',
          },
        ],
      },
    ],
  },
  {
    name: 'Pets & Animal Supplies',
    description:
      'Products for household pets and animal care, including food, grooming, housing, enrichment, accessories, and everyday supplies.',
    subcategories: [
      {
        name: 'Dog Supplies',
        description:
          'Food, accessories, grooming products, toys, bedding, travel equipment, and care products for dogs.',
        subcategories: [
          {
            name: 'Dog Food',
            description:
              'Prepared food products formulated for dogs and available in different formats, recipes, life-stage options, and dietary preferences.',
          },
          {
            name: 'Dog Collars',
            description:
              'Wearable collars designed for identification, everyday handling, walking, and pet accessories.',
          },
          {
            name: 'Dog Leashes',
            description:
              'Leads designed to provide controlled handling of dogs during walks and outdoor activities.',
          },
          {
            name: 'Dog Beds',
            description:
              'Dedicated resting and sleeping surfaces designed for dogs of different sizes and preferences.',
          },
          {
            name: 'Dog Toys',
            description:
              'Interactive, chew, fetch, puzzle, and recreational toys designed for canine play and enrichment.',
          },
        ],
      },
      {
        name: 'Cat Supplies',
        description:
          'Food, litter, toys, grooming products, furniture, carriers, and accessories designed for cats.',
        subcategories: [
          {
            name: 'Cat Food',
            description:
              'Prepared food products formulated for cats and offered in different textures, recipes, life-stage options, and feeding formats.',
          },
          {
            name: 'Cat Litter',
            description:
              'Absorbent or clumping materials designed for use in cat litter trays and household litter areas.',
          },
          {
            name: 'Cat Beds',
            description:
              'Comfortable resting products designed specifically for cats and their sleeping or lounging habits.',
          },
          {
            name: 'Cat Toys',
            description:
              'Interactive and recreational toys designed to encourage play, movement, stimulation, and enrichment for cats.',
          },
          {
            name: 'Cat Scratching Products',
            description:
              'Scratching posts, pads, boards, and related products designed to provide cats with appropriate scratching surfaces.',
          },
        ],
      },
      {
        name: 'Pet Grooming',
        description:
          'Products and tools used to clean, brush, maintain, and groom household pets.',
        subcategories: [
          {
            name: 'Pet Brushes',
            description:
              'Grooming brushes designed to remove loose hair, detangle coats, and maintain the appearance of pet fur.',
          },
          {
            name: 'Pet Combs',
            description:
              'Grooming combs designed for detangling, coat maintenance, and detailed grooming of pets.',
          },
          {
            name: 'Pet Shampoo',
            description:
              'Animal grooming cleansing products formulated for washing pet coats and maintaining cleanliness.',
          },
          {
            name: 'Nail Care Tools',
            description:
              'Pet grooming tools designed for maintaining the length and condition of animal nails.',
          },
          {
            name: 'Grooming Kits',
            description:
              'Collections of pet grooming tools assembled for routine coat, nail, cleaning, and general grooming tasks.',
          },
        ],
      },
    ],
  },
  {
    name: 'Books & Media',
    description:
      'Printed and physical reading, educational, reference, entertainment, and media products across many subjects and formats.',
    subcategories: [
      {
        name: 'Fiction Books',
        description:
          'Books containing imaginative stories, characters, settings, and narrative works created primarily for entertainment or literary appreciation.',
        subcategories: [
          {
            name: 'Novels',
            description:
              'Long-form fictional works presented as extended narratives involving characters, events, settings, and themes.',
          },
          {
            name: 'Mystery Fiction',
            description:
              'Fiction centered on mysteries, investigations, puzzles, hidden information, crimes, or the discovery of explanations.',
          },
          {
            name: 'Science Fiction',
            description:
              'Fiction exploring speculative scientific, technological, futuristic, extraterrestrial, or alternative-world concepts.',
          },
          {
            name: 'Fantasy',
            description:
              'Fiction featuring magical, mythical, supernatural, or fantastical settings, characters, and events.',
          },
          {
            name: 'Romance',
            description:
              'Fiction primarily focused on romantic relationships, emotional connections, and related interpersonal narratives.',
          },
        ],
      },
      {
        name: 'Educational Books',
        description:
          'Books created to support learning, instruction, study, reference, academic preparation, and skill development.',
        subcategories: [
          {
            name: 'School Textbooks',
            description:
              'Educational books aligned with school-level subjects, curricula, classroom instruction, and student study.',
          },
          {
            name: 'College Textbooks',
            description:
              'Academic books covering university and higher-education subjects, concepts, theories, and coursework.',
          },
          {
            name: 'Reference Books',
            description:
              'Books intended to provide factual information, definitions, explanations, data, and quick-reference material.',
          },
          {
            name: 'Study Guides',
            description:
              'Learning resources designed to help students review concepts, practice questions, organize study, and prepare for assessments.',
          },
          {
            name: 'Language Learning Books',
            description:
              'Books designed to help learners develop vocabulary, grammar, reading, writing, speaking, and comprehension skills in languages.',
          },
        ],
      },
      {
        name: 'Business Books',
        description:
          'Books covering entrepreneurship, management, finance, marketing, leadership, strategy, operations, and professional development.',
        subcategories: [
          {
            name: 'Entrepreneurship',
            description:
              'Books focused on starting, developing, managing, and growing businesses and entrepreneurial ventures.',
          },
          {
            name: 'Management',
            description:
              'Books covering organizational management, team leadership, operations, decision-making, and workplace practices.',
          },
          {
            name: 'Marketing',
            description:
              'Books focused on branding, advertising, customer behavior, sales, digital marketing, market research, and promotional strategy.',
          },
          {
            name: 'Finance',
            description:
              'Books covering personal finance, business finance, investment concepts, financial planning, accounting, and economic topics.',
          },
          {
            name: 'Leadership',
            description:
              'Books exploring leadership principles, communication, organizational influence, team development, and professional effectiveness.',
          },
        ],
      },
    ],
  },
  {
    name: 'Jewelry & Watches',
    description:
      'Jewelry, watches, fashion accessories, precious and decorative adornments designed for personal style, gifting, celebrations, and everyday wear.',
    subcategories: [
      {
        name: 'Fine Jewelry',
        description:
          'High-value jewelry made with precious metals, gemstones, diamonds, and other premium materials.',
        subcategories: [
          {
            name: 'Gold Jewelry',
            description:
              'Jewelry crafted primarily from gold and available in designs for everyday wear, celebrations, weddings, and formal occasions.',
          },
          {
            name: 'Diamond Jewelry',
            description:
              'Jewelry featuring diamonds as primary or accent stones, including rings, necklaces, earrings, and bracelets.',
          },
          {
            name: 'Gemstone Jewelry',
            description:
              'Jewelry incorporating natural, synthetic, or treated gemstones in decorative and wearable designs.',
          },
          {
            name: 'Silver Jewelry',
            description:
              'Jewelry made primarily from silver and offered in traditional, contemporary, casual, and decorative styles.',
          },
          {
            name: 'Platinum Jewelry',
            description:
              'Premium jewelry crafted from platinum and designed for long-term wear, special occasions, and luxury styling.',
          },
        ],
      },
      {
        name: 'Fashion Jewelry',
        description:
          'Decorative jewelry designed to complement fashion styles and outfits without necessarily using precious materials.',
        subcategories: [
          {
            name: 'Fashion Necklaces',
            description:
              'Decorative necklaces designed to complement casual, formal, festive, and contemporary outfits.',
          },
          {
            name: 'Fashion Earrings',
            description:
              'Decorative earrings available in studs, hoops, drops, danglers, and other fashion-oriented designs.',
          },
          {
            name: 'Fashion Bracelets',
            description:
              'Decorative wrist accessories made in various materials, colors, patterns, and styles.',
          },
          {
            name: 'Fashion Rings',
            description:
              'Decorative rings designed primarily as fashion accessories and available in numerous shapes, finishes, and styles.',
          },
          {
            name: 'Fashion Sets',
            description:
              'Coordinated collections containing multiple matching jewelry pieces such as necklaces, earrings, bracelets, or rings.',
          },
        ],
      },
      {
        name: 'Watches',
        description:
          'Wrist-worn timekeeping devices ranging from traditional analog watches to digital, sports, luxury, and connected models.',
        subcategories: [
          {
            name: 'Analog Watches',
            description:
              'Traditional watches that display time using physical hands and a dial.',
          },
          {
            name: 'Digital Watches',
            description:
              'Electronic watches that display time and related information through a digital screen.',
          },
          {
            name: 'Sports Watches',
            description:
              'Durable watches designed for active lifestyles, exercise, outdoor use, and sports-related activities.',
          },
          {
            name: 'Luxury Watches',
            description:
              'Premium watches emphasizing craftsmanship, materials, mechanical or advanced movements, design, and prestige.',
          },
          {
            name: 'Watch Accessories',
            description:
              'Products used to maintain, protect, store, customize, or wear watches, including straps, cases, and tools.',
          },
        ],
      },
    ],
  },
  {
    name: 'Office & School Supplies',
    description:
      'Stationery, writing products, organizational tools, school supplies, office equipment, and workplace essentials.',
    subcategories: [
      {
        name: 'Writing Instruments',
        description:
          'Products used for handwriting, marking, drawing, annotation, and everyday written communication.',
        subcategories: [
          {
            name: 'Ballpoint Pens',
            description:
              'Writing instruments that use a small rolling ball to transfer ink onto paper and other suitable surfaces.',
          },
          {
            name: 'Gel Pens',
            description:
              'Pens using gel-based ink designed for smooth writing and available in many colors and tip sizes.',
          },
          {
            name: 'Fountain Pens',
            description:
              'Refillable writing instruments that deliver liquid ink through a nib for expressive and traditional writing.',
          },
          {
            name: 'Pencils',
            description:
              'Graphite or specialty writing instruments used for writing, drawing, sketching, marking, and educational activities.',
          },
          {
            name: 'Markers',
            description:
              'Writing and drawing instruments containing ink or pigment and available for paper, boards, crafts, labeling, and specialized uses.',
          },
        ],
      },
      {
        name: 'Paper Products',
        description:
          'Paper-based products used for writing, printing, drawing, organization, packaging, education, and office work.',
        subcategories: [
          {
            name: 'Notebooks',
            description:
              'Bound or assembled paper products designed for notes, writing, journaling, schoolwork, planning, and record keeping.',
          },
          {
            name: 'Writing Pads',
            description:
              'Collections of writing paper designed for notes, drafts, lists, calculations, and temporary written work.',
          },
          {
            name: 'Printer Paper',
            description:
              'Paper manufactured for use in printers, copiers, and other document-output equipment.',
          },
          {
            name: 'Drawing Paper',
            description:
              'Paper designed for sketching, illustration, art exercises, technical drawing, and creative work.',
          },
          {
            name: 'Sticky Notes',
            description:
              'Small adhesive-backed paper notes designed for reminders, temporary labeling, organization, and quick messages.',
          },
        ],
      },
      {
        name: 'School Supplies',
        description:
          'Educational stationery and accessories used by students for classroom learning, homework, projects, and school organization.',
        subcategories: [
          {
            name: 'School Bags',
            description:
              'Bags designed for carrying books, notebooks, stationery, lunch items, and school essentials.',
          },
          {
            name: 'Pencil Cases',
            description:
              'Small storage cases designed to organize pencils, pens, erasers, sharpeners, and other stationery.',
          },
          {
            name: 'Geometry Sets',
            description:
              'Collections of mathematical drawing instruments such as rulers, compasses, protractors, and set squares.',
          },
          {
            name: 'Art Supplies',
            description:
              'Creative materials used by students for drawing, painting, coloring, crafting, and school art projects.',
          },
          {
            name: 'School Organizers',
            description:
              'Products designed to organize books, assignments, stationery, schedules, and other school materials.',
          },
        ],
      },
      {
        name: 'Office Equipment',
        description:
          'Equipment used in workplaces, home offices, educational institutions, and professional environments.',
        subcategories: [
          {
            name: 'Printers',
            description:
              'Electronic devices designed to produce physical documents, images, labels, and other printed materials.',
          },
          {
            name: 'Scanners',
            description:
              'Devices that convert physical documents, photographs, and other media into digital formats.',
          },
          {
            name: 'Projectors',
            description:
              'Display devices that project digital images and video onto screens or suitable surfaces.',
          },
          {
            name: 'Shredders',
            description:
              'Office machines designed to reduce paper and selected materials into smaller pieces for document disposal.',
          },
          {
            name: 'Laminators',
            description:
              'Machines used to apply protective film to documents, cards, signs, photographs, and other paper-based materials.',
          },
        ],
      },
    ],
  },
  {
    name: 'Home Appliances',
    description:
      'Electrical and electronic appliances designed to support cooking, cleaning, cooling, heating, laundry, food storage, and household convenience.',
    subcategories: [
      {
        name: 'Refrigeration',
        description:
          'Appliances designed to cool, preserve, freeze, and store food and beverages.',
        subcategories: [
          {
            name: 'Refrigerators',
            description:
              'Household cooling appliances designed to preserve fresh and packaged foods and beverages at controlled temperatures.',
          },
          {
            name: 'Freezers',
            description:
              'Appliances designed specifically for long-term frozen storage of food and other suitable products.',
          },
          {
            name: 'Mini Refrigerators',
            description:
              'Compact refrigeration appliances designed for bedrooms, offices, dormitories, entertainment spaces, and small living areas.',
          },
          {
            name: 'Wine Coolers',
            description:
              'Specialized cooling appliances designed to store wine and similar beverages under controlled conditions.',
          },
          {
            name: 'Ice Makers',
            description:
              'Appliances designed to produce ice for household, hospitality, entertainment, and beverage applications.',
          },
        ],
      },
      {
        name: 'Laundry Appliances',
        description:
          'Appliances designed for washing, drying, cleaning, and caring for clothing and household textiles.',
        subcategories: [
          {
            name: 'Washing Machines',
            description:
              'Household appliances designed to automatically wash clothing, linens, and other compatible textiles.',
          },
          {
            name: 'Dryers',
            description:
              'Appliances designed to remove moisture from washed clothing and textiles.',
          },
          {
            name: 'Washer Dryers',
            description:
              'Combined appliances capable of washing and drying compatible clothing and household textiles.',
          },
          {
            name: 'Laundry Steamers',
            description:
              'Steam-producing appliances used to refresh garments and reduce visible wrinkles.',
          },
          {
            name: 'Clothes Irons',
            description:
              'Heating appliances used to press clothing and remove wrinkles from compatible fabrics.',
          },
        ],
      },
      {
        name: 'Kitchen Appliances',
        description:
          'Electrical appliances designed to prepare, cook, process, heat, and serve food and beverages.',
        subcategories: [
          {
            name: 'Microwave Ovens',
            description:
              'Kitchen appliances that use electromagnetic energy to heat or cook compatible foods.',
          },
          {
            name: 'Ovens',
            description:
              'Appliances designed for baking, roasting, heating, and cooking food in an enclosed chamber.',
          },
          {
            name: 'Air Fryers',
            description:
              'Countertop cooking appliances designed to circulate heated air around food for a particular style of crisp cooking.',
          },
          {
            name: 'Food Processors',
            description:
              'Kitchen machines designed for chopping, slicing, shredding, mixing, and other food-preparation tasks.',
          },
          {
            name: 'Blenders',
            description:
              'Motorized kitchen appliances designed to blend, puree, mix, and process suitable food and beverage ingredients.',
          },
        ],
      },
      {
        name: 'Heating & Cooling',
        description:
          'Household appliances designed to regulate indoor temperature, airflow, ventilation, and comfort.',
        subcategories: [
          {
            name: 'Air Conditioners',
            description:
              'Appliances designed to cool indoor spaces and, depending on the model, provide additional temperature and air-management functions.',
          },
          {
            name: 'Air Coolers',
            description:
              'Cooling appliances that use airflow and evaporative processes to provide localized or room cooling.',
          },
          {
            name: 'Fans',
            description:
              'Devices designed to circulate air for ventilation and personal or room comfort.',
          },
          {
            name: 'Room Heaters',
            description:
              'Portable or fixed appliances designed to provide supplemental heating for indoor spaces.',
          },
          {
            name: 'Dehumidifiers',
            description:
              'Appliances designed to remove excess moisture from indoor air and help manage humidity levels.',
          },
        ],
      },
    ],
  },
  {
    name: 'Lighting & Electrical',
    description:
      'Lighting products, electrical accessories, power distribution products, switches, cables, and equipment used in homes, offices, commercial spaces, and other environments.',
    subcategories: [
      {
        name: 'Light Bulbs',
        description:
          'Replaceable electric light sources designed for residential, commercial, decorative, and specialty lighting applications.',
        subcategories: [
          {
            name: 'LED Bulbs',
            description:
              'Energy-efficient electric light sources using light-emitting diode technology for general illumination and specialized applications.',
          },
          {
            name: 'Smart Bulbs',
            description:
              'Connected light bulbs that can provide app-based, voice-based, automated, or network-enabled lighting controls.',
          },
          {
            name: 'Decorative Bulbs',
            description:
              'Light bulbs designed with visual emphasis on shape, filament appearance, color, or decorative presentation.',
          },
          {
            name: 'Tube Lights',
            description:
              'Linear lighting products designed to provide broad illumination in residential, commercial, industrial, and institutional spaces.',
          },
          {
            name: 'Specialty Bulbs',
            description:
              'Lighting products designed for specific fixtures, applications, environments, or visual effects.',
          },
        ],
      },
      {
        name: 'Indoor Lighting',
        description:
          'Lighting fixtures and systems designed to illuminate interior residential, commercial, and institutional spaces.',
        subcategories: [
          {
            name: 'Ceiling Lights',
            description:
              'Light fixtures mounted on or near ceilings to provide general or decorative room illumination.',
          },
          {
            name: 'Pendant Lights',
            description:
              'Decorative hanging light fixtures suspended from ceilings and commonly used over tables, counters, and selected interior areas.',
          },
          {
            name: 'Table Lamps',
            description:
              'Portable lamps designed to provide localized illumination on desks, tables, bedside surfaces, and other furniture.',
          },
          {
            name: 'Floor Lamps',
            description:
              'Freestanding lighting fixtures designed to provide ambient, task, or accent illumination.',
          },
          {
            name: 'Wall Lights',
            description:
              'Lighting fixtures mounted to walls and used for ambient, accent, decorative, or task illumination.',
          },
        ],
      },
      {
        name: 'Outdoor Lighting',
        description:
          'Lighting products designed for exterior spaces such as gardens, pathways, entrances, buildings, driveways, and public areas.',
        subcategories: [
          {
            name: 'Garden Lights',
            description:
              'Decorative and functional lighting fixtures designed for gardens, landscaping, paths, patios, and outdoor decorative spaces.',
          },
          {
            name: 'Security Lights',
            description:
              'Exterior lighting products intended to illuminate entrances, pathways, yards, driveways, and other areas requiring visibility.',
          },
          {
            name: 'Solar Lights',
            description:
              'Outdoor lighting products designed to use energy collected from sunlight for illumination.',
          },
          {
            name: 'Flood Lights',
            description:
              'High-output lighting fixtures designed to illuminate relatively large outdoor or indoor areas.',
          },
          {
            name: 'Street Lights',
            description:
              'Lighting fixtures designed to illuminate roads, streets, pathways, parking areas, campuses, and public spaces.',
          },
        ],
      },
      {
        name: 'Electrical Accessories',
        description:
          'Products used to connect, distribute, control, protect, and manage electrical power in compatible systems.',
        subcategories: [
          {
            name: 'Extension Cords',
            description:
              'Flexible electrical cables designed to extend the reach of compatible power connections.',
          },
          {
            name: 'Power Strips',
            description:
              'Electrical distribution products providing multiple outlets from a single power connection.',
          },
          {
            name: 'Electrical Switches',
            description:
              'Devices used to manually or automatically control electrical circuits and connected equipment.',
          },
          {
            name: 'Electrical Sockets',
            description:
              'Fixed electrical connection points designed to accept compatible plugs and supply power to devices.',
          },
          {
            name: 'Electrical Cables',
            description:
              'Conductive cable products used to carry electrical power or signals in compatible installations and equipment.',
          },
        ],
      },
    ],
  },
  {
    name: 'Travel & Luggage',
    description:
      'Bags, luggage, travel accessories, organizers, and equipment designed for transportation, holidays, business trips, commuting, and outdoor travel.',
    subcategories: [
      {
        name: 'Luggage',
        description:
          'Travel bags and cases designed to transport clothing, personal belongings, equipment, and other travel necessities.',
        subcategories: [
          {
            name: 'Suitcases',
            description:
              'Structured travel cases designed to hold and protect clothing and personal belongings during trips.',
          },
          {
            name: 'Carry-On Luggage',
            description:
              'Compact luggage designed for travelers who need to keep a bag with them during transportation where permitted.',
          },
          {
            name: 'Travel Bags',
            description:
              'Flexible bags designed for short trips, holidays, business travel, and general transportation of belongings.',
          },
          {
            name: 'Duffel Bags',
            description:
              'Large flexible bags commonly used for travel, sports, short trips, and carrying clothing or equipment.',
          },
          {
            name: 'Luggage Sets',
            description:
              'Coordinated collections containing multiple pieces of luggage in matching or complementary sizes and designs.',
          },
        ],
      },
      {
        name: 'Backpacks',
        description:
          'Shoulder-carried bags designed for travel, commuting, education, outdoor activities, and everyday transportation.',
        subcategories: [
          {
            name: 'Travel Backpacks',
            description:
              'Backpacks designed with compartments and features intended for carrying travel clothing, accessories, electronics, and personal belongings.',
          },
          {
            name: 'Laptop Backpacks',
            description:
              'Backpacks featuring dedicated compartments designed to carry laptops and related work or study equipment.',
          },
          {
            name: 'Hiking Backpacks',
            description:
              'Outdoor backpacks designed for carrying equipment, food, water, clothing, and supplies during hiking activities.',
          },
          {
            name: 'School Backpacks',
            description:
              'Backpacks designed for students to carry books, notebooks, stationery, electronics, and school supplies.',
          },
          {
            name: 'Everyday Backpacks',
            description:
              'General-purpose backpacks designed for commuting, shopping, work, study, leisure, and everyday transportation.',
          },
        ],
      },
      {
        name: 'Travel Accessories',
        description:
          'Supporting products designed to improve organization, convenience, comfort, security, and efficiency during travel.',
        subcategories: [
          {
            name: 'Travel Organizers',
            description:
              'Small bags, pouches, and organizational products designed to arrange clothing, documents, electronics, and personal items.',
          },
          {
            name: 'Travel Pillows',
            description:
              'Portable cushions designed to provide support and comfort during travel and seated journeys.',
          },
          {
            name: 'Passport Holders',
            description:
              'Protective organizers designed to store passports and related travel documents.',
          },
          {
            name: 'Luggage Tags',
            description:
              'Identification tags designed to help identify and distinguish luggage and travel bags.',
          },
          {
            name: 'Travel Bottles',
            description:
              'Small reusable containers designed to carry appropriate personal-care liquids and other travel-sized products.',
          },
        ],
      },
    ],
  },
];

export default categories;
