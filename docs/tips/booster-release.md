Booster releases

Booster release uses git branches, `develop` is under active development, and contains a lots of commit.

And merges to `master` branch is when we do internal / alpha releases.
(If you feel courageous, use master over release to get earlier update and fixes)

And we have a `release` branch for the actually public release.

The difference in `release` branch is that it will only contain minimal commits.

We squash all the new commits in master before merges into `release` branch.

This way, users will be able to keep a sane commit history and also enjoys
the benefit of be able to do a `git pull` to upgrade `booster`.

Also public user won't have to download all the history `git object` since they only needed `release branch`
