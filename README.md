# :grey_exclamation: Quiz Game

A CLI based interactive question and answer game :sweat_smile:

## How to play

npm: `npx not-quiz-game` \
pnpm: `pnpm dlx not-quiz-game` \
yarn: `yarn dlx not-quiz-game`

## Configuration Parameters

> [!NOTE]  
> If some value is not correct, the game will use the default

### Lives

Command: `-l or --lives`  \
Type: Number between 1 and 10  \
Default: 3

### Number of questions

Command: `-q or --questions` \
Type: Number between 3 and 20 \
Default: 6

### Game Mode

Command: `-m or --mode` \
Type: String - `multiple` | `boolean` \
Default: `multiple`

### Difficulty

Command: `-d or --difficulty`  \
Type: String - `any`  |  `easy`  |  `medium`  | `hard`  \
Default: `medium`

### Topic

Command: `-t or --topic`  \
Type: Number between 9 and 32 - Click for view all [available topics](https://opentdb.com/api_category.php)  \
Default: 18 - (Science: Computers) \

| Id | Name                                  |
|----|---------------------------------------|
| 9  | General Knowledge                     |
| 10 | Entertainment: Books                  |
| 11 | Entertainment: Film                   |
| 12 | Entertainment: Music                  |
| 13 | Entertainment: Musicals & Theatres    |
| 14 | Entertainment: Television             |
| 15 | Entertainment: Video Games            |
| 16 | Entertainment: Board Games            |
| 17 | Science & Nature                      |
| 18 | Science: Computers                    |
| 19 | Science: Mathematics                  |
| 20 | Mythology                             |
| 21 | Sports                                |
| 22 | Geography                             |
| 23 | History                               |
| 24 | Politics                              |
| 25 | Art                                   |
| 26 | Celebrities                           |
| 27 | Animals                               |
| 28 | Vehicles                              |
| 29 | Entertainment: Comics                 |
| 30 | Science: Gadgets                      |
| 31 | Entertainment: Japanese Anime & Manga |
| 32 | Entertainment: Cartoon & Animations   |

### Debug mode (view configurations on start menu)

Command: Just add `--debug` to your params \
Type: Boolean \
Default: Disabled \

## Questions

All the questions are fetched from [Open Trivia Database](https://opentdb.com/).

### Special thanks to Fireship

This game is based on the [JavaScript Millionaire CLI Tool](https://github.com/fireship-io/javascript-millionaire) tutorial. Check [Fireship](https://github.com/fireship-io) repository for more cool things.
