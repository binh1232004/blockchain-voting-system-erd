# Learn 
1. Asynchronous in loop [article](https://zellwk.com/blog/async-await-in-loops/)
2. Fetch data and store in var 
Instead of 
```
  const [oer, setOer] = useState(undefined);
  useEffect(()=> {
    const fetchDataOerOpenTextBook = async () => {
      const req = await fetch('/api/oer');
      const res = await req.json();
      console.log(res.oer.data);
      // setOer(res.oer.data);
    }
    fetchDataOerOpenTextBook();
  }, [])
```
use useSwr
3. useEffect execute after render phase
4. can assign like this 
```
function re(){
  return {
    hello: 1,
    hi:2
  }
}
const {hello: ba, hi} = re();
console.log(ba, hi)
//1 2
```
# BUG
~~1. encode, decode slug got wrong like "Introduction to Programming using Fortran 95/2003/2008" will go to another wrong page and sometimes can not find that oer based on slug~~
Solution
Params.slug in dynamic routing of nextjs encode slug like using encodeURIComponent(slugify(slug))
so storing encodeURIComponent(slugify(slug)) in api to find right oer when comparing params.slug
~~2. CLICK ONE TIME, IT SHOW 2 TIMES IN FRONTEND > APP > COMPONENTS > OERdETAIL~~
Solution
In react strict mode it will render 2 times
3. Only claim 10 tokens, if config in metamask > settings > advanced > clear activity tab data
4. Do not have enough ETH to do transaction;
5. Do not catch exception in Voting contract, useVoting > voteTokens
6. Not enough quantity token of oer when user type in
# FEATURE
1. Adding api to simple database
2. Replace utils file into folder and separte each files
3. Handle for account changed
