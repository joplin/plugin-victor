import joplin from 'api';
import { MenuItemLocation } from 'api/types';

joplin.plugins.register({
	onStart: async function() {
		const dialogs = joplin.views.dialogs;
		const panels = joplin.views.panels;

		let dialog:string = '';
		let logPanel:string = '';

		await joplin.commands.register({
			name: 'victor',
			label: 'Delete all data...',
			execute: async () => {
				if (!dialog) dialog = await dialogs.create('confirmDialog');
				
				await dialogs.setHtml(dialog, '<p><strong>This will permanently delete all your data</strong> - all your notes, notebooks, attachments and tags. The data cannot be recovered.</p><p>Would you like to continue?</p>');
				await dialogs.setButtons(dialog, [
					{
						id: 'ok',
						title: 'Delete all my data',
					},
					{
						id: 'cancel',
					},
				]);

				const result = await dialogs.open(dialog);
				
				if (result.id === 'cancel') return;

				if (!logPanel) logPanel = await panels.create("logPanel");

				await panels.setHtml(logPanel, '');

				const tablesToDelete = [
					'resources',
					'notes',
					'folders',
					'tags',
				];

				const report:Record<string, number> = {
					resources: 0,
					notes: 0,
					folders: 0,
					tags: 0,
				};

				const updateLogPanel = async (completed:boolean) => {
					const lines:string[] = [
						`<strong>${completed ? 'All items have been deleted.' : 'Deletion in progress...'}</strong><br/>`
					];
					for (const [name, num] of Object.entries(report)) {
						lines.push(name + ': ' + num.toString());	
					}
				
					await panels.setHtml(logPanel, '<div style="padding: 10px;">' + lines.join('<br/>') + '</div>');
				}

				const deletedItemIds:string[] = [];

				for (const tableName of tablesToDelete) {
					while (true) {
						const page = await joplin.data.get([tableName], {
							page: 1,
							fields: ['id'],
							limit: 50,
						});

						report[tableName] += page.items.length;

						const promises:Promise<any>[] = [];
						for (const item of page.items) {
							// We'd end up in an infinite loop
							if (deletedItemIds.includes(item.id)) throw new Error('Trying to delete an item that has already been processed - aborting');

							deletedItemIds.push(item.id);
							promises.push(await joplin.data.delete([tableName, item.id]));
						}
						await Promise.all(promises);

						await updateLogPanel(false);
						
						if (!page.has_more) break;
					}
				}

				await updateLogPanel(true);
			},
		});

		await joplin.views.menuItems.create('victor', 'victor', MenuItemLocation.Tools);
	},
});
