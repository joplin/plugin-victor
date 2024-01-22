# Victor Plugin for Joplin

<img style="float:left; margin-right: 15px; margin-bottom:15px;" src="images/icon-128.png"/>

[Victor](https://www.youtube.com/watch?v=QE6eiPD2z-Y) helps you delete all your Joplin data and start over. It can sometimes be useful for example when you want to clear a sync target you do not have full access to. In that case you would invoke Victor, delete all your data, then synchronise with the service (which in turn will delete the remote data).

Of course the plugin should be used very carefully because once deleted the data cannot be recovered. In fact, after having used it, it is better to disable or even uninstall it to prevent any accidental use.

You may also want to backup your data first (File > Export All > JEX) in case you realise later on that you had some important data in there.

## Installation and usage

In Joplin, open the configuration screen, then under "Plugins" search for "victor".

Then under the **Tools** menu, select **Delete all data...**

## If there is still some data left on the sync target

If there is still some data left on the sync target, it may be because your app is not completely in sync. In that case, go to Configuration > Synchronisation > Advanced and click on "Delete local data and re-download from sync target".

Wait for all data to be downloaded, then run Victor, and synchronise again.

## More info

All notes, notebooks, attachments, tags and revisions are deleted.

## License

MIT
