const questionData = {
    objective: "hello World",
    points: "10 points",
    task: `Synchronization is one of the biggest features of StackEdit. It enables you to synchronize any file in your workspace with other files stored in your **Google Drive**, your **Dropbox** and your **GitHub** accounts. This allows you to keep writing on other devices, collaborate with people you share the file with, integrate easily into your workflow... The synchronization mechanism takes place every minute in the background, downloading, merging, and uploading file modifications.
    
There are two types of synchronization and they can complement each other:

* 1.Step 1.
* 2.Step 2.
* 3.Step 3.
    
-  This will allow you to fetch your workspace on any other device.
    > To start syncing your workspace, just sign in with Google in the menu.
`,
    inputFormat: `The first line contains a single integer, q, denoting the number of queries.
Each line of the subsequent lines contains a single query in the form described in the problem statement above. All three queries start with an integer denoting the query q, but only query 1 is followed by an additional space-separated value, x, denoting the value to be enqueued.
    
**Constraints**
--------------
It is guaranteed that a valid answer always exists for each query of type 1.`,
    outputFormat: `Print three lines of output. The first line prints the character, ch.

The second line prints the string, s.

The third line prints the sentence, sen.`,
    sampleInput: [
      `10 4
4.0 2.0`,
      `10 4
4.0 2.0`,
    ],
    sampleOutput: [
      `14 6
6.0 2.0`,
      `14 6
6.0 2.0`,
    ],
    explanation: `
When we sum the integers 10  and 4 , we get the integer 14. When we subtract the second number 4 from the first number 10, we get  as their difference.
When we sum the floating-point numbers 4.0 and 2.0, we get 6.0. When we subtract the second number 2.0 from the first number 4.0, we get 2.0 as their difference.`,
  };

export default questionData;