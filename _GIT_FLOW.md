The Git Flow

### Any time a new chunk of work needs to be done create a new branch ###

```git checkout -b "<branch-name>"```


Whenever you finish pieces of work, commit them to the branch.
Be liberal as opposed to conservative with your commits.

```git commit -m "<some-message>"```


When the branch is in a golden state and has accomplished the tasks
you scoped out when creating it, push it up to gitHub

```git push origin <branch-name> ```

Submit a pull request for this branch on github. Any other person on the
team can go approve the request as long as it looks sane. While approving, Don't worry too
much about testing this code locally.

## If there is a pull request for the branch, it should be working! ##
That is on the person who is cranking on the branch.

Once it is merged, make sure to pull master down to your local branch.

IF you were working on some other branch and a merge went through, run

``` git checkout master ```
``` git pull ````
``` git checkout <some-other-branch-name> ```
``` git rebase master ```


If you have submitted a pull request, for now just wait until it has been merged to start
a new branch. That way we can keep everything in line for now.
