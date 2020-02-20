'use strict';
const bcrypt = require( 'bcrypt' );
const { SALT_ROUND } = require( './../constants' );
const profilePictures = [
  'https://www.phdmedia.com/panama/wp-content/uploads/sites/97/2015/05/temp-people-profile.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfGRcR7qHaDD3fWPSvkIEBDwGDjwVykLN7cew2mR3biXw0TFU6',
  'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTAm-VKGMId4g1eaQw8oc_PFL26Sgl29MEYY9y_SkrwBJkSLjrv',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSOlfpP6fjS-ti40m7DrSHMDRFZ0AGJxVzuEMU2hnsJfkRRAXR2',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTa7iOe0Fv6gALxLH2uUEES9p2MEAiNBzConCsFKZk7eG67lV-Q',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxxi6Kra3lpQIj__YvlfDFNZEpcDqoFXJ38JyqSAIDefzxVNLb',
  'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340',
];

const firstNames = [
  'Liam',
  'Noah',
  'William',
  'James',
  'Oliver',
  'Benjamin',
  'Elijah',
  'Lucas',
  'Mason',
  'Logan',
  'Alexander',
  'Ethan',
  'Jacob',
  'Michael',
  'Daniel',
  'Henry',
  'Jackson',
  'Sebastian',
  'Aiden',
  'Matthew',
  'Samuel',
  'David',
  'Joseph',
  'Carter',
  'Owen',
  'Wyatt',
  'John',
  'Jack',
  'Luke',
  'Jayden',
  'Dylan',
  'Grayson',
  'Levi',
  'Isaac',
  'Gabriel',
  'Julian',
  'Mateo',
  'Anthony',
  'Jaxon',
  'Lincoln',
  'Joshua',
  'Christopher',
  'Andrew',
  'Theodore',
  'Caleb',
  'Ryan',
  'Asher',
  'Nathan',
  'Thomas',
  'Leo',
  'Isaiah',
  'Charles',
  'Josiah',
  'Hudson',
  'Christian',
  'Hunter',
  'Connor',
  'Eli',
  'Ezra',
  'Aaron',
  'Landon',
  'Adrian',
  'Jonathan',
  'Nolan',
  'Jeremiah',
  'Easton',
  'Elias',
  'Colton',
  'Cameron',
  'Carson',
  'Robert',
  'Angel',
  'Maverick',
  'Nicholas',
  'Dominic',
  'Jaxson',
  'Greyson',
  'Adam',
  'Ian',
  'Austin',
  'Santiago',
  'Jordan',
  'Cooper',
  'Brayden',
  'Roman',
  'Evan',
  'Ezekiel',
  'Xavier',
  'Jose',
  'Jace',
  'Jameson',
  'Leonardo',
  'Bryson',
  'Axel',
  'Everett',
  'Parker',
  'Kayden',
  'Miles',
  'Sawyer',
  'Jason',
  'Declan',
  'Weston',
  'Micah',
  'Ayden',
  'Wesley',
  'Luca',
  'Vincent',
  'Damian',
  'Zachary',
  'Silas',
  'Gavin',
  'Chase',
  'Kai',
  'Emmett',
  'Harrison',
  'Nathaniel',
  'Kingston',
  'Cole',
  'Tyler',
  'Bennett',
  'Bentley',
  'Ryker',
  'Tristan',
  'Brandon',
  'Kevin',
  'Luis',
  'George',
  'Ashton',
  'Rowan',
  'Braxton',
  'Ryder',
  'Gael',
  'Ivan',
  'Diego',
  'Maxwell',
  'Max',
  'Carlos',
  'Kaiden',
  'Juan',
  'Maddox',
  'Justin',
  'Waylon',
  'Calvin',
  'Giovanni',
  'Jonah',
  'Abel',
  'Jayce',
  'Jesus',
  'Amir',
  'King',
  'Beau',
  'Camden',
  'Alex',
  'Jasper',
  'Malachi',
  'Brody',
  'Jude',
  'Blake',
  'Emmanuel',
  'Eric',
  'Brooks',
  'Elliot',
  'Antonio',
  'Abraham',
  'Timothy',
  'Finn',
  'Rhett',
  'Elliott',
  'Edward',
  'August',
  'Xander',
  'Alan',
  'Dean',
  'Lorenzo',
  'Bryce',
  'Karter',
  'Victor',
  'Milo',
  'Miguel',
  'Hayden',
  'Graham',
  'Grant',
  'Zion',
  'Tucker',
  'Jesse',
  'Zayden',
  'Joel',
  'Richard',
  'Patrick',
  'Emiliano',
  'Avery',
  'Nicolas',
  'Brantley',
  'Dawson',
  'Myles',
  'Matteo',
  'River',
  'Steven',
  'Thiago',
  'Zane',
  'Matias',
  'Judah',
  'Messiah',
  'Jeremy',
  'Preston',
  'Oscar',
  'Kaleb',
  'Alejandro',
  'Marcus',
  'Mark',
  'Peter',
  'Maximus',
  'Barrett',
  'Jax',
  'Andres',
  'Holden',
  'Legend',
  'Charlie',
  'Knox',
  'Kaden',
  'Paxton',
  'Kyrie',
  'Kyle',
  'Griffin',
  'Josue',
  'Kenneth',
  'Beckett',
  'Enzo',
  'Adriel',
  'Arthur',
  'Felix',
  'Bryan',
  'Lukas',
  'Paul',
  'Brian',
  'Colt',
  'Caden',
  'Leon',
  'Archer',
  'Omar',
  'Israel',
  'Aidan',
  'Theo',
  'Javier',
  'Remington',
  'Jaden',
  'Bradley',
  'Emilio',
  'Colin',
  'Riley',
  'Cayden',
  'Phoenix',
  'Clayton',
  'Simon',
  'Ace',
  'Nash',
  'Derek',
  'Rafael',
  'Zander',
  'Brady',
  'Jorge',
  'Jake',
  'Louis',
  'Damien',
  'Karson',
  'Walker',
  'Maximiliano',
  'Amari',
  'Sean',
  'Chance',
  'Walter',
  'Martin',
  'Finley',
  'Andre',
  'Tobias',
  'Cash',
  'Corbin',
  'Arlo',
  'Iker',
  'Erick',
  'Emerson',
  'Gunner',
  'Cody',
  'Stephen',
  'Francisco',
  'Killian',
  'Dallas',
  'Reid',
  'Manuel',
  'Lane',
  'Atlas',
  'Rylan',
  'Jensen',
  'Ronan',
  'Beckham',
  'Daxton',
  'Anderson',
  'Kameron',
  'Raymond',
  'Orion',
  'Cristian',
  'Tanner',
  'Kyler',
  'Jett',
  'Cohen',
  'Ricardo',
  'Spencer',
  'Gideon',
  'Ali',
  'Fernando',
  'Jaiden',
  'Titus',
  'Travis',
  'Bodhi',
  'Eduardo',
  'Dante',
  'Ellis',
  'Prince',
  'Kane',
  'Luka',
  'Kash',
  'Hendrix',
  'Desmond',
  'Donovan',
  'Mario',
  'Atticus',
  'Cruz',
  'Garrett',
  'Hector',
  'Angelo',
  'Jeffrey',
  'Edwin',
  'Cesar',
  'Zayn',
  'Devin',
  'Conor',
  'Warren',
  'Odin',
  'Jayceon',
  'Romeo',
  'Julius',
  'Jaylen',
  'Hayes',
  'Kayson',
  'Muhammad',
  'Jaxton',
  'Joaquin',
  'Caiden',
  'Dakota',
  'Major',
  'Keegan',
  'Sergio',
  'Marshall',
  'Johnny',
  'Kade',
  'Edgar',
  'Leonel',
  'Ismael',
  'Marco',
  'Tyson',
  'Wade',
  'Collin',
  'Troy',
  'Nasir',
  'Conner',
  'Adonis',
  'Jared',
  'Rory',
  'Andy',
  'Jase',
  'Lennox',
  'Shane',
  'Malik',
  'Ari',
  'Reed',
  'Seth',
  'Clark',
  'Erik',
  'Lawson',
  'Trevor',
  'Gage',
  'Nico',
  'Malakai',
  'Quinn',
  'Cade',
  'Johnathan',
  'Sullivan',
  'Solomon',
  'Cyrus',
  'Fabian',
  'Pedro',
  'Frank',
  'Shawn',
  'Malcolm',
  'Khalil',
  'Nehemiah',
  'Dalton',
  'Mathias',
  'Jay',
  'Ibrahim',
  'Peyton',
  'Winston',
  'Kason',
  'Zayne',
  'Noel',
  'Princeton',
  'Matthias',
  'Gregory',
  'Sterling',
  'Dominick',
  'Elian',
  'Grady',
  'Russell',
  'Finnegan',
  'Ruben',
  'Gianni',
  'Porter',
  'Kendrick',
  'Leland',
  'Pablo',
  'Allen',
  'Hugo',
  'Raiden',
  'Kolton',
  'Remy',
  'Ezequiel',
  'Damon',
  'Emanuel',
  'Zaiden',
  'Otto',
  'Bowen',
  'Marcos',
  'Abram',
  'Kasen',
  'Franklin',
  'Royce',
  'Jonas',
  'Sage',
  'Philip',
  'Esteban',
  'Drake',
  'Kashton',
  'Roberto',
  'Harvey',
  'Alexis',
  'Kian',
  'Jamison',
  'Maximilian',
  'Adan',
  'Milan',
  'Phillip',
  'Albert',
  'Dax',
  'Mohamed',
  'Ronin',
  'Kamden',
  'Hank',
  'Memphis',
  'Oakley',
  'Augustus',
  'Drew',
  'Moises',
  'Armani',
  'Rhys',
  'Benson',
  'Jayson',
  'Kyson',
  'Braylen',
  'Corey',
  'Gunnar',
  'Omari',
  'Alonzo',
  'Landen',
  'Armando',
  'Derrick',
  'Dexter',
  'Enrique',
  'Bruce',
  'Nikolai',
  'Francis',
  'Rocco',
  'Kairo',
  'Royal',
  'Zachariah',
  'Arjun',
  'Deacon',
  'Skyler',
  'Eden',
  'Alijah',
  'Rowen',
  'Pierce',
  'Uriel',
  'Ronald',
  'Luciano',
  'Tate',
  'Frederick',
  'Kieran',
  'Lawrence',
  'Moses',
  'Rodrigo',
  'Brycen',
  'Leonidas',
  'Nixon',
  'Keith',
  'Chandler',
  'Case',
  'Davis',
  'Asa',
  'Darius',
  'Isaias',
  'Aden',
  'Jaime',
  'Landyn',
  'Raul',
  'Niko',
  'Trenton',
  'Apollo',
  'Cairo',
  'Izaiah',
  'Scott',
  'Dorian',
  'Julio',
  'Wilder',
  'Santino',
  'Dustin',
  'Donald',
  'Raphael',
  'Saul',
  'Taylor',
  'Ayaan',
  'Duke',
  'Ryland',
  'Tatum',
  'Ahmed',
  'Moshe',
  'Edison',
  'Emmitt',
  'Cannon',
  'Alec',
  'Danny',
  'Keaton',
  'Roy',
  'Conrad',
  'Roland',
  'Quentin',
  'Lewis',
  'Samson',
  'Brock',
  'Kylan',
  'Cason',
  'Ahmad',
  'Jalen',
  'Nikolas',
  'Braylon',
  'Kamari',
  'Dennis',
  'Callum',
  'Justice',
  'Soren',
  'Rayan',
  'Aarav',
  'Gerardo',
  'Ares',
  'Brendan',
  'Jamari',
  'Kaison',
  'Yusuf',
  'Issac',
  'Jasiah',
  'Callen',
  'Forrest',
  'Makai',
  'Crew',
  'Kobe',
  'Bo',
  'Julien',
  'Mathew',
  'Braden',
  'Johan',
  'Marvin',
  'Zaid',
  'Stetson',
  'Casey',
  'Ty',
  'Ariel',
  'Tony',
  'Zain',
  'Callan',
  'Cullen',
  'Sincere',
  'Uriah',
  'Dillon',
  'Kannon',
  'Colby',
  'Axton',
  'Cassius',
  'Quinton',
  'Mekhi',
  'Reece',
  'Alessandro',
  'Jerry',
  'Mauricio',
  'Sam',
  'Trey',
  'Mohammad',
  'Alberto',
  'Gustavo',
  'Arturo',
  'Fletcher',
  'Marcelo',
  'Abdiel',
  'Hamza',
  'Alfredo',
  'Chris',
  'Finnley',
  'Curtis',
  'Kellan',
  'Quincy',
  'Kase',
  'Harry',
  'Kyree',
  'Wilson',
  'Cayson',
  'Hezekiah',
  'Kohen',
  'Neil',
  'Mohammed',
  'Raylan',
  'Kaysen',
  'Lucca',
  'Sylas',
  'Mack',
  'Leonard',
  'Lionel',
  'Ford',
  'Roger',
  'Rex',
  'Alden',
  'Boston',
  'Colson',
  'Briggs',
  'Zeke',
  'Dariel',
  'Kingsley',
  'Valentino',
  'Jamir',
  'Salvador',
  'Vihaan',
  'Mitchell',
  'Lance',
  'Lucian',
  'Darren',
  'Jimmy',
  'Alvin',
  'Amos',
  'Tripp',
  'Zaire',
  'Layton',
  'Reese',
  'Casen',
  'Colten',
  'Brennan',
  'Korbin',
  'Sonny',
  'Bruno',
  'Orlando',
  'Devon',
  'Huxley',
  'Boone',
  'Maurice',
  'Nelson',
  'Douglas',
  'Randy',
  'Gary',
  'Lennon',
  'Titan',
  'Denver',
  'Jaziel',
  'Noe',
  'Jefferson',
  'Ricky',
  'Lochlan',
  'Rayden',
  'Bryant',
  'Langston',
  'Lachlan',
  'Clay',
  'Abdullah',
  'Lee',
  'Baylor',
  'Leandro',
  'Ben',
  'Kareem',
  'Layne',
  'Joe',
  'Crosby',
  'Deandre',
  'Demetrius',
  'Kellen',
  'Carl',
  'Jakob',
  'Ridge',
  'Bronson',
  'Jedidiah',
  'Rohan',
  'Larry',
  'Stanley',
  'Tomas',
  'Shiloh',
  'Thaddeus',
  'Watson',
  'Baker',
  'Vicente',
  'Koda',
  'Jagger',
  'Nathanael',
  'Carmelo',
  'Shepherd',
  'Graysen',
  'Melvin',
  'Ernesto',
  'Jamie',
  'Yosef',
  'Clyde',
  'Eddie',
  'Tristen',
  'Grey',
  'Ray',
  'Tommy',
  'Samir',
  'Ramon',
  'Santana',
  'Kristian',
  'Marcel',
  'Wells',
  'Zyaire',
  'Brecken',
  'Byron',
  'Otis',
  'Reyansh',
  'Axl',
  'Joey',
  'Trace',
  'Morgan',
  'Musa',
  'Harlan',
  'Enoch',
  'Henrik',
  'Kristopher',
  'Talon',
  'Rey',
  'Guillermo',
  'Houston',
  'Jon',
  'Vincenzo',
  'Dane',
  'Terry',
  'Azariah',
  'Castiel',
  'Kye',
  'Augustine',
  'Zechariah',
  'Joziah',
  'Kamryn',
  'Hassan',
  'Jamal',
  'Chaim',
  'Bodie',
  'Emery',
  'Branson',
  'Jaxtyn',
  'Kole',
  'Wayne',
  'Aryan',
  'Alonso',
  'Brixton',
  'Madden',
  'Allan',
  'Flynn',
  'Jaxen',
  'Harley',
  'Magnus',
  'Sutton',
  'Dash',
  'Anders',
  'Westley',
  'Brett',
  'Emory',
  'Felipe',
  'Yousef',
  'Jadiel',
  'Mordechai',
  'Dominik',
  'Junior',
  'Eliseo',
  'Fisher',
  'Harold',
  'Jaxxon',
  'Kamdyn',
  'Maximo',
  'Caspian',
  'Kelvin',
  'Damari',
  'Fox',
  'Trent',
  'Hugh',
  'Briar',
  'Franco',
  'Keanu',
  'Terrance',
  'Yahir',
  'Ameer',
  'Kaiser',
  'Thatcher',
  'Ishaan',
  'Koa',
  'Merrick',
  'Coen',
  'Rodney',
  'Brayan',
  'London',
  'Rudy',
  'Gordon',
  'Bobby',
  'Aron',
  'Marc',
  'Van',
  'Anakin',
  'Canaan',
  'Dario',
  'Reginald',
  'Westin',
  'Darian',
  'Ledger',
  'Leighton',
  'Maxton',
  'Tadeo',
  'Valentin',
  'Aldo',
  'Khalid',
  'Nickolas',
  'Toby',
  'Dayton',
  'Jacoby',
  'Billy',
  'Gatlin',
  'Elisha',
  'Jabari',
  'Jermaine',
  'Alvaro',
  'Marlon',
  'Mayson',
  'Blaze',
  'Jeffery',
  'Kace',
  'Braydon',
  'Achilles',
  'Brysen',
  'Saint',
  'Xzavier',
  'Aydin',
  'Eugene',
  'Adrien',
  'Cain',
  'Kylo',
  'Nova',
  'Onyx',
  'Arian',
  'Bjorn',
  'Jerome',
  'Miller',
  'Alfred',
  'Kenzo',
  'Kyng',
  'Leroy',
  'Maison',
  'Jordy',
  'Stefan',
  'Wallace',
  'Benicio',
  'Kendall',
  'Zayd',
  'Blaine',
  'Tristian',
  'Anson',
  'Gannon',
  'Jeremias',
  'Marley',
  'Ronnie',
  'Dangelo',
  'Kody',
  'Will',
  'Bentlee',
  'Gerald',
  'Salvatore',
  'Turner',
  'Chad',
  'Misael',
  'Mustafa',
  'Konnor',
  'Maxim',
  'Rogelio',
  'Zakai',
  'Cory',
  'Judson',
  'Brentley',
  'Darwin',
  'Louie',
  'Ulises',
  'Dakari',
  'Rocky',
  'Wesson',
  'Alfonso',
  'Payton',
  'Dwayne',
  'Juelz',
  'Duncan',
  'Keagan',
  'Deshawn',
  'Bode',
  'Bridger',
  'Skylar',
  'Brodie',
  'Landry',
  'Avi',
  'Keenan',
  'Reuben',
  'Jaxx',
  'Rene',
  'Yehuda',
  'Imran',
  'Yael',
  'Alexzander',
  'Willie',
  'Cristiano',
  'Heath',
  'Lyric',
  'Davion',
  'Elon',
  'Karsyn',
  'Krew',
  'Jairo',
  'Maddux',
  'Ephraim',
  'Ignacio',
  'Vivaan',
  'Aries',
  'Vance',
  'Boden',
  'Lyle',
  'Ralph',
  'Reign',
  'Camilo',
  'Draven',
  'Terrence',
  'Idris',
  'Ira',
  'Javion',
  'Jericho',
  'Khari',
  'Marcellus',
  'Creed',
  'Shepard',
  'Terrell',
  'Ahmir',
  'Camdyn',
  'Cedric',
  'Howard',
  'Jad',
  'Zahir',
  'Harper',
  'Justus',
  'Forest',
  'Gibson',
  'Zev',
  'Alaric',
  'Decker',
  'Ernest',
  'Jesiah',
  'Torin',
  'Benedict',
  'Bowie',
  'Deangelo',
  'Genesis',
  'Harlem',
  'Kalel',
  'Kylen',
  'Bishop',
  'Immanuel',
  'Lian',
  'Zavier',
  'Archie',
  'Davian',
  'Gus',
  'Kabir',
  'Korbyn',
  'Randall',
  'Benton',
  'Coleman',
  'Markus',
  'Emma',
  'Olivia',
  'Ava',
  'Isabella',
  'Sophia',
  'Charlotte',
  'Mia',
  'Amelia',
  'Harper',
  'Evelyn',
  'Abigail',
  'Emily',
  'Elizabeth',
  'Mila',
  'Ella',
  'Avery',
  'Sofia',
  'Camila',
  'Aria',
  'Scarlett',
  'Victoria',
  'Madison',
  'Luna',
  'Grace',
  'Chloe',
  'Penelope',
  'Layla',
  'Riley',
  'Zoey',
  'Nora',
  'Lily',
  'Eleanor',
  'Hannah',
  'Lillian',
  'Addison',
  'Aubrey',
  'Ellie',
  'Stella',
  'Natalie',
  'Zoe',
  'Leah',
  'Hazel',
  'Violet',
  'Aurora',
  'Savannah',
  'Audrey',
  'Brooklyn',
  'Bella',
  'Claire',
  'Skylar',
  'Lucy',
  'Paisley',
  'Everly',
  'Anna',
  'Caroline',
  'Nova',
  'Genesis',
  'Emilia',
  'Kennedy',
  'Samantha',
  'Maya',
  'Willow',
  'Kinsley',
  'Naomi',
  'Aaliyah',
  'Elena',
  'Sarah',
  'Ariana',
  'Allison',
  'Gabriella',
  'Alice',
  'Madelyn',
  'Cora',
  'Ruby',
  'Eva',
  'Serenity',
  'Autumn',
  'Adeline',
  'Hailey',
  'Gianna',
  'Valentina',
  'Isla',
  'Eliana',
  'Quinn',
  'Nevaeh',
  'Ivy',
  'Sadie',
  'Piper',
  'Lydia',
  'Alexa',
  'Josephine',
  'Emery',
  'Julia',
  'Delilah',
  'Arianna',
  'Vivian',
  'Kaylee',
  'Sophie',
  'Brielle',
  'Madeline',
  'Peyton',
  'Rylee',
  'Clara',
  'Hadley',
  'Melanie',
  'Mackenzie',
  'Reagan',
  'Adalynn',
  'Liliana',
  'Aubree',
  'Jade',
  'Katherine',
  'Isabelle',
  'Natalia',
  'Raelynn',
  'Maria',
  'Athena',
  'Ximena',
  'Arya',
  'Leilani',
  'Taylor',
  'Faith',
  'Rose',
  'Kylie',
  'Alexandra',
  'Mary',
  'Margaret',
  'Lyla',
  'Ashley',
  'Amaya',
  'Eliza',
  'Brianna',
  'Bailey',
  'Andrea',
  'Khloe',
  'Jasmine',
  'Melody',
  'Iris',
  'Isabel',
  'Norah',
  'Annabelle',
  'Valeria',
  'Emerson',
  'Adalyn',
  'Ryleigh',
  'Eden',
  'Emersyn',
  'Anastasia',
  'Kayla',
  'Alyssa',
  'Juliana',
  'Charlie',
  'Esther',
  'Ariel',
  'Cecilia',
  'Valerie',
  'Alina',
  'Molly',
  'Reese',
  'Aliyah',
  'Lilly',
  'Parker',
  'Finley',
  'Morgan',
  'Sydney',
  'Jordyn',
  'Eloise',
  'Trinity',
  'Daisy',
  'Kimberly',
  'Lauren',
  'Genevieve',
  'Sara',
  'Arabella',
  'Harmony',
  'Elise',
  'Remi',
  'Teagan',
  'Alexis',
  'London',
  'Sloane',
  'Laila',
  'Lucia',
  'Diana',
  'Juliette',
  'Sienna',
  'Elliana',
  'Londyn',
  'Ayla',
  'Callie',
  'Gracie',
  'Josie',
  'Amara',
  'Jocelyn',
  'Daniela',
  'Everleigh',
  'Mya',
  'Rachel',
  'Summer',
  'Alana',
  'Brooke',
  'Alaina',
  'Mckenzie',
  'Catherine',
  'Amy',
  'Presley',
  'Journee',
  'Rosalie',
  'Ember',
  'Brynlee',
  'Rowan',
  'Joanna',
  'Paige',
  'Rebecca',
  'Ana',
  'Sawyer',
  'Mariah',
  'Nicole',
  'Brooklynn',
  'Payton',
  'Marley',
  'Fiona',
  'Georgia',
  'Lila',
  'Harley',
  'Adelyn',
  'Alivia',
  'Noelle',
  'Gemma',
  'Vanessa',
  'Journey',
  'Makayla',
  'Angelina',
  'Adaline',
  'Catalina',
  'Alayna',
  'Julianna',
  'Leila',
  'Lola',
  'Adriana',
  'June',
  'Juliet',
  'Jayla',
  'River',
  'Tessa',
  'Lia',
  'Dakota',
  'Delaney',
  'Selena',
  'Blakely',
  'Ada',
  'Camille',
  'Zara',
  'Malia',
  'Hope',
  'Samara',
  'Vera',
  'Mckenna',
  'Briella',
  'Izabella',
  'Hayden',
  'Raegan',
  'Michelle',
  'Angela',
  'Ruth',
  'Freya',
  'Kamila',
  'Vivienne',
  'Aspen',
  'Olive',
  'Kendall',
  'Elaina',
  'Thea',
  'Kali',
  'Destiny',
  'Amiyah',
  'Evangeline',
  'Cali',
  'Blake',
  'Elsie',
  'Juniper',
  'Alexandria',
  'Myla',
  'Ariella',
  'Kate',
  'Mariana',
  'Lilah',
  'Charlee',
  'Daleyza',
  'Nyla',
  'Jane',
  'Maggie',
  'Zuri',
  'Aniyah',
  'Lucille',
  'Leia',
  'Melissa',
  'Adelaide',
  'Amina',
  'Giselle',
  'Lena',
  'Camilla',
  'Miriam',
  'Millie',
  'Brynn',
  'Gabrielle',
  'Sage',
  'Annie',
  'Logan',
  'Lilliana',
  'Haven',
  'Jessica',
  'Kaia',
  'Magnolia',
  'Amira',
  'Adelynn',
  'Makenzie',
  'Stephanie',
  'Nina',
  'Phoebe',
  'Arielle',
  'Evie',
  'Lyric',
  'Alessandra',
  'Gabriela',
  'Paislee',
  'Raelyn',
  'Madilyn',
  'Paris',
  'Makenna',
  'Kinley',
  'Gracelyn',
  'Talia',
  'Maeve',
  'Rylie',
  'Kiara',
  'Evelynn',
  'Brinley',
  'Jacqueline',
  'Laura',
  'Gracelynn',
  'Lexi',
  'Ariah',
  'Fatima',
  'Jennifer',
  'Kehlani',
  'Alani',
  'Ariyah',
  'Luciana',
  'Allie',
  'Heidi',
  'Maci',
  'Phoenix',
  'Felicity',
  'Joy',
  'Kenzie',
  'Veronica',
  'Margot',
  'Addilyn',
  'Lana',
  'Cassidy',
  'Remington',
  'Saylor',
  'Ryan',
  'Keira',
  'Harlow',
  'Miranda',
  'Angel',
  'Amanda',
  'Daniella',
  'Royalty',
  'Gwendolyn',
  'Ophelia',
  'Heaven',
  'Jordan',
  'Madeleine',
  'Esmeralda',
  'Kira',
  'Miracle',
  'Elle',
  'Amari',
  'Danielle',
  'Daphne',
  'Willa',
  'Haley',
  'Gia',
  'Kaitlyn',
  'Oakley',
  'Kailani',
  'Winter',
  'Alicia',
  'Serena',
  'Nadia',
  'Aviana',
  'Demi',
  'Jada',
  'Braelynn',
  'Dylan',
  'Ainsley',
  'Alison',
  'Camryn',
  'Avianna',
  'Bianca',
  'Skyler',
  'Scarlet',
  'Maddison',
  'Nylah',
  'Sarai',
  'Regina',
  'Dahlia',
  'Nayeli',
  'Raven',
  'Helen',
  'Adrianna',
  'Averie',
  'Skye',
  'Kelsey',
  'Tatum',
  'Kensley',
  'Maliyah',
  'Erin',
  'Viviana',
  'Jenna',
  'Anaya',
  'Carolina',
  'Shelby',
  'Sabrina',
  'Mikayla',
  'Annalise',
  'Octavia',
  'Lennon',
  'Blair',
  'Carmen',
  'Yaretzi',
  'Kennedi',
  'Mabel',
  'Zariah',
  'Kyla',
  'Christina',
  'Selah',
  'Celeste',
  'Eve',
  'Mckinley',
  'Milani',
  'Frances',
  'Jimena',
  'Kylee',
  'Leighton',
  'Katie',
  'Aitana',
  'Kayleigh',
  'Sierra',
  'Kathryn',
  'Rosemary',
  'Jolene',
  'Alondra',
  'Elisa',
  'Helena',
  'Charleigh',
  'Hallie',
  'Lainey',
  'Avah',
  'Jazlyn',
  'Kamryn',
  'Mira',
  'Cheyenne',
  'Francesca',
  'Antonella',
  'Wren',
  'Chelsea',
  'Amber',
  'Emory',
  'Lorelei',
  'Nia',
  'Abby',
  'April',
  'Emelia',
  'Carter',
  'Aylin',
  'Cataleya',
  'Bethany',
  'Marlee',
  'Carly',
  'Kaylani',
  'Emely',
  'Liana',
  'Madelynn',
  'Cadence',
  'Matilda',
  'Sylvia',
  'Myra',
  'Fernanda',
  'Oaklyn',
  'Elianna',
  'Hattie',
  'Dayana',
  'Kendra',
  'Maisie',
  'Malaysia',
  'Kara',
  'Katelyn',
  'Maia',
  'Celine',
  'Cameron',
  'Renata',
  'Jayleen',
  'Charli',
  'Emmalyn',
  'Holly',
  'Azalea',
  'Leona',
  'Alejandra',
  'Bristol',
  'Collins',
  'Imani',
  'Meadow',
  'Alexia',
  'Edith',
  'Kaydence',
  'Leslie',
  'Lilith',
  'Kora',
  'Aisha',
  'Meredith',
  'Danna',
  'Wynter',
  'Emberly',
  'Julieta',
  'Michaela',
  'Alayah',
  'Jemma',
  'Reign',
  'Colette',
  'Kaliyah',
  'Elliott',
  'Johanna',
  'Remy',
  'Sutton',
  'Emmy',
  'Virginia',
  'Briana',
  'Oaklynn',
  'Adelina',
  'Everlee',
  'Megan',
  'Angelica',
  'Justice',
  'Mariam',
  'Khaleesi',
  'Macie',
  'Karsyn',
  'Alanna',
  'Aleah',
  'Mae',
  'Mallory',
  'Esme',
  'Skyla',
  'Madilynn',
  'Charley',
  'Allyson',
  'Hanna',
  'Shiloh',
  'Henley',
  'Macy',
  'Maryam',
  'Ivanna',
  'Ashlynn',
  'Lorelai',
  'Amora',
  'Ashlyn',
  'Sasha',
  'Baylee',
  'Beatrice',
  'Itzel',
  'Priscilla',
  'Marie',
  'Jayda',
  'Liberty',
  'Rory',
  'Alessia',
  'Alaia',
  'Janelle',
  'Kalani',
  'Gloria',
  'Sloan',
  'Dorothy',
  'Greta',
  'Julie',
  'Zahra',
  'Savanna',
  'Annabella',
  'Poppy',
  'Amalia',
  'Zaylee',
  'Cecelia',
  'Coraline',
  'Kimber',
  'Emmie',
  'Anne',
  'Karina',
  'Kassidy',
  'Kynlee',
  'Monroe',
  'Anahi',
  'Jaliyah',
  'Jazmin',
  'Maren',
  'Monica',
  'Siena',
  'Marilyn',
  'Reyna',
  'Kyra',
  'Lilian',
  'Jamie',
  'Melany',
  'Alaya',
  'Ariya',
  'Kelly',
  'Rosie',
  'Adley',
  'Dream',
  'Jaylah',
  'Laurel',
  'Jazmine',
  'Mina',
  'Karla',
  'Bailee',
  'Aubrie',
  'Katalina',
  'Melina',
  'Harlee',
  'Elliot',
  'Hayley',
  'Elaine',
  'Karen',
  'Dallas',
  'Irene',
  'Lylah',
  'Ivory',
  'Chaya',
  'Rosa',
  'Aleena',
  'Braelyn',
  'Nola',
  'Alma',
  'Leyla',
  'Pearl',
  'Addyson',
  'Roselyn',
  'Lacey',
  'Lennox',
  'Reina',
  'Aurelia',
  'Noa',
  'Janiyah',
  'Jessie',
  'Madisyn',
  'Saige',
  'Alia',
  'Tiana',
  'Astrid',
  'Cassandra',
  'Kyleigh',
  'Romina',
  'Stevie',
  'Haylee',
  'Zelda',
  'Lillie',
  'Aileen',
  'Brylee',
  'Eileen',
  'Yara',
  'Ensley',
  'Lauryn',
  'Giuliana',
  'Livia',
  'Anya',
  'Mikaela',
  'Palmer',
  'Lyra',
  'Mara',
  'Marina',
  'Kailey',
  'Liv',
  'Clementine',
  'Kenna',
  'Briar',
  'Emerie',
  'Galilea',
  'Tiffany',
  'Bonnie',
  'Elyse',
  'Cynthia',
  'Frida',
  'Kinslee',
  'Tatiana',
  'Joelle',
  'Armani',
  'Jolie',
  'Nalani',
  'Rayna',
  'Yareli',
  'Meghan',
  'Rebekah',
  'Addilynn',
  'Faye',
  'Zariyah',
  'Lea',
  'Aliza',
  'Julissa',
  'Lilyana',
  'Anika',
  'Kairi',
  'Aniya',
  'Noemi',
  'Angie',
  'Crystal',
  'Bridget',
  'Ari',
  'Davina',
  'Amelie',
  'Amirah',
  'Annika',
  'Elora',
  'Xiomara',
  'Linda',
  'Hana',
  'Laney',
  'Mercy',
  'Hadassah',
  'Madalyn',
  'Louisa',
  'Simone',
  'Kori',
  'Jillian',
  'Alena',
  'Malaya',
  'Miley',
  'Milan',
  'Sariyah',
  'Malani',
  'Clarissa',
  'Nala',
  'Princess',
  'Amani',
  'Analia',
  'Estella',
  'Milana',
  'Aya',
  'Chana',
  'Jayde',
  'Tenley',
  'Zaria',
  'Itzayana',
  'Penny',
  'Ailani',
  'Lara',
  'Aubriella',
  'Clare',
  'Lina',
  'Rhea',
  'Bria',
  'Thalia',
  'Keyla',
  'Haisley',
  'Ryann',
  'Addisyn',
  'Amaia',
  'Chanel',
  'Ellen',
  'Harmoni',
  'Aliana',
  'Tinsley',
  'Landry',
  'Paisleigh',
  'Lexie',
  'Myah',
  'Rylan',
  'Deborah',
  'Emilee',
  'Laylah',
  'Novalee',
  'Ellis',
  'Emmeline',
  'Avalynn',
  'Hadlee',
  'Legacy',
  'Braylee',
  'Elisabeth',
  'Kaylie',
  'Ansley',
  'Dior',
  'Paula',
  'Belen',
  'Corinne',
  'Maleah',
  'Martha',
  'Teresa',
  'Salma',
  'Louise',
  'Averi',
  'Lilianna',
  'Amiya',
  'Milena',
  'Royal',
  'Aubrielle',
  'Calliope',
  'Frankie',
  'Natasha',
  'Kamilah',
  'Meilani',
  'Raina',
  'Amayah',
  'Lailah',
  'Rayne',
  'Zaniyah',
  'Isabela',
  'Nathalie',
  'Miah',
  'Opal',
  'Kenia',
  'Azariah',
  'Hunter',
  'Tori',
  'Andi',
  'Keily',
  'Leanna',
  'Scarlette',
  'Jaelyn',
  'Saoirse',
  'Selene',
  'Dalary',
  'Lindsey',
  'Marianna',
  'Ramona',
  'Estelle',
  'Giovanna',
  'Holland',
  'Nancy',
  'Emmalynn',
  'Mylah',
  'Rosalee',
  'Sariah',
  'Zoie',
  'Blaire',
  'Lyanna',
  'Maxine',
  'Anais',
  'Dana',
  'Judith',
  'Kiera',
  'Jaelynn',
  'Noor',
  'Kai',
  'Adalee',
  'Oaklee',
  'Amaris',
  'Jaycee',
  'Belle',
  'Carolyn',
  'Della',
  'Karter',
  'Sky',
  'Treasure',
  'Vienna',
  'Jewel',
  'Rivka',
  'Rosalyn',
  'Alannah',
  'Ellianna',
  'Sunny',
  'Claudia',
  'Cara',
  'Hailee',
  'Estrella',
  'Harleigh',
  'Zhavia',
  'Alianna',
  'Brittany',
  'Jaylene',
  'Journi',
  'Marissa',
  'Mavis',
  'Iliana',
  'Jurnee',
  'Aislinn',
  'Alyson',
  'Elsa',
  'Kamiyah',
  'Kiana',
  'Lisa',
  'Arlette',
  'Kadence',
  'Kathleen',
  'Halle',
  'Erika',
  'Sylvie',
  'Adele',
  'Erica',
  'Veda',
  'Whitney',
  'Bexley',
  'Emmaline',
  'Guadalupe',
  'August',
  'Brynleigh',
  'Gwen',
  'Promise',
  'Alisson',
  'India',
  'Madalynn',
  'Paloma',
  'Patricia',
  'Samira',
  'Aliya',
  'Casey',
  'Jazlynn',
  'Paulina',
  'Dulce',
  'Kallie',
  'Perla',
  'Adrienne',
  'Alora',
  'Nataly',
  'Ayleen',
  'Christine',
  'Kaiya',
  'Ariadne',
  'Karlee',
  'Barbara',
  'Lillianna',
  'Raquel',
  'Saniyah',
  'Yamileth',
  'Arely',
  'Celia',
  'Heavenly',
  'Kaylin',
  'Marisol',
  'Marleigh',
  'Avalyn',
  'Berkley',
  'Kataleya',
  'Zainab',
  'Dani',
  'Egypt',
  'Joyce',
  'Kenley',
  'Annabel',
  'Kaelyn',
  'Etta',
  'Hadleigh',
  'Joselyn',
  'Luella',
  'Jaylee',
  'Zola',
  'Alisha',
  'Ezra',
  'Queen',
  'Amia',
  'Annalee',
  'Bellamy',
  'Paola',
  'Tinley',
  'Violeta',
  'Jenesis',
  'Arden',
  'Giana',
  'Wendy',
  'Ellison',
  'Florence',
  'Margo',
  'Naya',
  'Robin',
  'Sandra',
  'Scout',
  'Waverly',
  'Janessa',
  'Jayden',
  'Micah',
  'Novah',
  'Zora',
  'Ann',
  'Jana',
  'Taliyah',
  'Vada',
  'Giavanna',
  'Ingrid',
  'Valery',
  'Azaria',
  'Emmarie',
  'Esperanza',
  'Kailyn',
  'Aiyana',
  'Keilani',
  'Austyn',
  'Whitley',
  'Elina',
  'Kimora',
  'Maliah',
];

const lastNames = [
  'Hamilton',
  'Wilson',
  'Wells',
  'Jenkins',
  'Ivanov',
  'Whitehouse',
  'Stevenson',
  'Pittman'
];

function generateUsers (count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const name = firstNames[Math.floor( Math.random() * firstNames.length )];
    const surname = lastNames[Math.floor( Math.random() * lastNames.length )];
    users.push( {
                  firstName: name,
                  lastName: surname,
                  email: `email${i + 1}@gmail.com`,
                  passwordHash: bcrypt.hashSync( `paSSword123`, bcrypt.genSaltSync( SALT_ROUND ) ),
                  profilePicture: profilePictures[Math.floor( Math.random() * profilePictures.length )],
                  createdAt: new Date(),
                  updatedAt: new Date(),
                } );
  }
  return users;
}

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert( 'Users', generateUsers( 1000 ), {} );

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete( 'Users', null, {} );
  }
};
