/* Preference content and result profiles; all artwork is local. */
(function (root) {
  "use strict";
  const genres = ["Romance","Horror","Fantasy","Sci-Fi","Adventure","History","Drama"];
  const profiles = {
  "Romance": {
    "color": "#a44057",
    "symbol": "♥",
    "subtitle": "A heart worth following",
    "blurb": "You find meaning in the moments between people: a shared laugh, an unexpected kindness, a brave confession. Your story makes room for connection."
  },
  "Horror": {
    "color": "#47364d",
    "symbol": "☾",
    "subtitle": "Beyond the last light",
    "blurb": "Your curiosity reaches into the shadows. You notice the uncanny detail and keep turning pages when the house falls quiet. Your story has a delicious shiver of possibility."
  },
  "Fantasy": {
    "color": "#4d7256",
    "symbol": "❧",
    "subtitle": "Where wonder takes root",
    "blurb": "You leave room for enchantment. A winding path, a small treasure, a door half hidden by ivy: your imagination turns everyday details into extraordinary beginnings."
  },
  "Sci-Fi": {
    "color": "#33787e",
    "symbol": "✧",
    "subtitle": "A horizon still unwritten",
    "blurb": "You are drawn to possibility. You ask what might change, what we might discover, and who we could become. Your next chapter looks beyond the familiar sky."
  },
  "Adventure": {
    "color": "#9a6522",
    "symbol": "➶",
    "subtitle": "The long way home",
    "blurb": "You follow the spark that leads somewhere new. Movement, discovery, and a little courage keep your pages turning. Your story starts where the comfortable road ends."
  },
  "History": {
    "color": "#805b3e",
    "symbol": "❦",
    "subtitle": "The echoes we carry",
    "blurb": "You are drawn to things with a past. Places, rituals, and well-kept objects carry stories that deserve another reading. Your pages connect yesterday with today."
  },
  "Drama": {
    "color": "#475b77",
    "symbol": "✺",
    "subtitle": "The things left unsaid",
    "blurb": "You notice the weight of an ordinary moment. Family, ambition, and difficult choices give your story depth. You want to understand the person behind the next sentence."
  }
};
  const questions = [
  {
    "title": "Pick a dessert.",
    "label": "ROUND ONE · THE DESSERT CART",
    "closing": "What catches your eye?",
    "options": [
      {
        "title": "Cake",
        "description": "Soft sponge, sweet frosting, a little celebration.",
        "primary": "Romance",
        "secondary": "Drama",
        "illustration": "cake"
      },
      {
        "title": "Pie",
        "description": "Buttery pastry with a golden, flaky lid.",
        "primary": "History",
        "secondary": "Romance",
        "illustration": "pie"
      },
      {
        "title": "Ice Cream",
        "description": "A cool scoop with a silky, melting finish.",
        "primary": "Sci-Fi",
        "secondary": "Adventure",
        "illustration": "icecream"
      },
      {
        "title": "Baklava",
        "description": "Crisp layers, toasted nuts, a honeyed finish.",
        "primary": "Fantasy",
        "secondary": "History",
        "illustration": "baklava"
      }
    ]
  },
  {
    "title": "Pick a color.",
    "label": "ROUND TWO · THE COLOR CABINET",
    "closing": "Which shade feels like you?",
    "options": [
      {
        "title": "Green",
        "description": "Fresh moss after a gentle rain.",
        "primary": "Fantasy",
        "secondary": "Adventure",
        "illustration": "green"
      },
      {
        "title": "Yellow",
        "description": "Sun-warmed gold, bright and full of life.",
        "primary": "Adventure",
        "secondary": "Romance",
        "illustration": "yellow"
      },
      {
        "title": "Blue",
        "description": "Deep water beneath an open sky.",
        "primary": "Sci-Fi",
        "secondary": "Drama",
        "illustration": "blue"
      },
      {
        "title": "Brown",
        "description": "Dark earth and well-worn leather.",
        "primary": "History",
        "secondary": "Horror",
        "illustration": "brown"
      }
    ]
  },
  {
    "title": "Choose a painting.",
    "label": "ROUND THREE · THE GALLERY WALL",
    "closing": "Which one draws you closer?",
    "options": [
      {
        "title": "Abstract",
        "description": "Bold shapes in a restless conversation.",
        "primary": "Sci-Fi",
        "secondary": "Fantasy",
        "illustration": "abstract"
      },
      {
        "title": "The Scream",
        "description": "A wavering sky and a face full of feeling.",
        "primary": "Horror",
        "secondary": "Drama",
        "illustration": "scream"
      },
      {
        "title": "Pointillism",
        "description": "Tiny flecks of light, a tender whole.",
        "primary": "Romance",
        "secondary": "History",
        "illustration": "pointillism"
      },
      {
        "title": "Realist",
        "description": "An ordinary moment, honestly observed.",
        "primary": "Drama",
        "secondary": "History",
        "illustration": "realist"
      }
    ]
  },
  {
    "title": "Pick something to drink.",
    "label": "ROUND FOUR · A CUP OF SOMETHING",
    "closing": "What will you have?",
    "options": [
      {
        "title": "Coffee",
        "description": "Dark roast with a bittersweet edge.",
        "primary": "Drama",
        "secondary": "Horror",
        "illustration": "coffee"
      },
      {
        "title": "Tea",
        "description": "Fragrant leaves and a slow, warm sip.",
        "primary": "History",
        "secondary": "Fantasy",
        "illustration": "tea"
      },
      {
        "title": "Hot Chocolate",
        "description": "Cocoa, soft foam, and a little comfort.",
        "primary": "Romance",
        "secondary": "Fantasy",
        "illustration": "cocoa"
      },
      {
        "title": "Energy Drink",
        "description": "A bright, fizzy jolt of possibility.",
        "primary": "Adventure",
        "secondary": "Sci-Fi",
        "illustration": "can"
      }
    ]
  },
  {
    "title": "Which sport would you most enjoy watching?",
    "label": "ROUND FIVE · FROM THE SIDELINES",
    "closing": "Choose your seat.",
    "options": [
      {
        "title": "Football",
        "description": "Roaring stands and a last-minute drive.",
        "primary": "Drama",
        "secondary": "Adventure",
        "illustration": "football"
      },
      {
        "title": "Hockey",
        "description": "Cold air, sharp turns, a flash of ice.",
        "primary": "Horror",
        "secondary": "Adventure",
        "illustration": "hockey"
      },
      {
        "title": "Lacrosse",
        "description": "Fast passes beneath a wide-open sky.",
        "primary": "Adventure",
        "secondary": "History",
        "illustration": "lacrosse"
      },
      {
        "title": "Bowling",
        "description": "Polished lanes and a satisfying tumble.",
        "primary": "Sci-Fi",
        "secondary": "Romance",
        "illustration": "bowling"
      }
    ]
  },
  {
    "title": "Pick an instrument.",
    "label": "ROUND SIX · THE MUSIC ROOM",
    "closing": "What would you play?",
    "options": [
      {
        "title": "Guitar",
        "description": "Warm strings and an easy melody.",
        "primary": "Romance",
        "secondary": "Adventure",
        "illustration": "guitar"
      },
      {
        "title": "Piano",
        "description": "Ivory keys with a resonant heart.",
        "primary": "Drama",
        "secondary": "Romance",
        "illustration": "piano"
      },
      {
        "title": "Drums",
        "description": "A deep pulse you feel in your chest.",
        "primary": "Horror",
        "secondary": "Fantasy",
        "illustration": "drums"
      },
      {
        "title": "Brass",
        "description": "A burnished glow and a bold fanfare.",
        "primary": "History",
        "secondary": "Drama",
        "illustration": "brass"
      }
    ]
  },
  {
    "title": "Pick an appetizer.",
    "label": "ROUND SEVEN · A LITTLE BEFORE DINNER",
    "closing": "Which plate comes first?",
    "options": [
      {
        "title": "Chicken Wings",
        "description": "A smoky glaze and a peppery kick.",
        "primary": "Adventure",
        "secondary": "Horror",
        "illustration": "wings"
      },
      {
        "title": "Bruschetta",
        "description": "Ripe tomatoes on crisp, golden toast.",
        "primary": "Romance",
        "secondary": "History",
        "illustration": "bruschetta"
      },
      {
        "title": "Charcuterie",
        "description": "A generous board of savory little bites.",
        "primary": "History",
        "secondary": "Drama",
        "illustration": "board"
      },
      {
        "title": "Fried Pickles",
        "description": "Tangy crunch in a crisp, salty coat.",
        "primary": "Horror",
        "secondary": "Sci-Fi",
        "illustration": "pickles"
      }
    ]
  },
  {
    "title": "Pick a vacation destination.",
    "label": "ROUND EIGHT · A CHANGE OF SCENERY",
    "closing": "Where will you wander?",
    "options": [
      {
        "title": "Paris",
        "description": "Café tables and softly glowing streets.",
        "primary": "Romance",
        "secondary": "Drama",
        "illustration": "paris"
      },
      {
        "title": "New York",
        "description": "Busy corners, bright windows, big dreams.",
        "primary": "Drama",
        "secondary": "Sci-Fi",
        "illustration": "city"
      },
      {
        "title": "Hawaii",
        "description": "Salt air and green volcanic ridges.",
        "primary": "Adventure",
        "secondary": "Fantasy",
        "illustration": "island"
      },
      {
        "title": "Mountains",
        "description": "Pine-scented air and faraway peaks.",
        "primary": "Fantasy",
        "secondary": "Horror",
        "illustration": "mountains"
      }
    ]
  },
  {
    "title": "Pick a way to get around.",
    "label": "ROUND NINE · THE ROAD AHEAD",
    "closing": "How will you get there?",
    "options": [
      {
        "title": "Car",
        "description": "An open road and your own soundtrack.",
        "primary": "Horror",
        "secondary": "Adventure",
        "illustration": "car"
      },
      {
        "title": "Bus",
        "description": "A window seat and the rhythm of the city.",
        "primary": "Drama",
        "secondary": "History",
        "illustration": "bus"
      },
      {
        "title": "Bicycle",
        "description": "A little breeze and a lighter footprint.",
        "primary": "Fantasy",
        "secondary": "Romance",
        "illustration": "bicycle"
      },
      {
        "title": "Skateboard",
        "description": "Quick wheels and a pavement adventure.",
        "primary": "Adventure",
        "secondary": "Sci-Fi",
        "illustration": "skateboard"
      }
    ]
  },
  {
    "title": "Choose a candy.",
    "label": "ROUND TEN · ONE FOR THE ROAD",
    "closing": "A sweet final chapter.",
    "options": [
      {
        "title": "Chocolate",
        "description": "Rich cocoa that slowly melts away.",
        "primary": "Fantasy",
        "secondary": "Romance",
        "illustration": "chocolate"
      },
      {
        "title": "Sour Candy",
        "description": "A bright little spark of sweet and sharp.",
        "primary": "Sci-Fi",
        "secondary": "Horror",
        "illustration": "candy"
      },
      {
        "title": "Twizzlers",
        "description": "A chewy red twist with a playful pull.",
        "primary": "Horror",
        "secondary": "Drama",
        "illustration": "twists"
      },
      {
        "title": "Lollipop",
        "description": "A swirl of sugar, saved for the journey.",
        "primary": "Fantasy",
        "secondary": "Sci-Fi",
        "illustration": "lollipop"
      }
    ]
  }
];
  const data = { genres, profiles, questions };
  root.QuizData = data;
  if (typeof module !== "undefined") module.exports = data;
})(globalThis);
