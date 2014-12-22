Ext.define("Frx.panel.HatioGanttPanel", {
	
	extend : "Gnt.panel.Gantt",
	
	requires : [
		'Gnt.plugin.TaskEditor',
		'Gnt.column.StartDate',
		'Gnt.column.EndDate',
		'Gnt.column.Duration',
		'Gnt.column.PercentDone',
		'Gnt.column.ResourceAssignment',
		'Sch.plugin.TreeCellEditing',
		'Sch.plugin.Pan',
		'Frx.panel.HatioTaskContextMenu'
	],
	
	xtype : 'hatio_gantt_panel',
    
	highlightWeekends       : true,
	
	showTodayLine           : true,
	
	loadMask                : true,
	
	enableProgressBarResize : true,
	
	cascadeChanges          : true,

	initComponent : function () {

		Ext.apply(this, {
			// Define a custom HTML template for regular tasks
			taskBodyTemplate : '<div class="sch-gantt-progress-bar" style="width:{percentDone}%;{progressBarStyle}" unselectable="on"><span>{percentDone}%<span></span></div>',

			// Define properties for the left 'locked' and scrollable tree grid
			lockedGridConfig : {
				width       : 400,
				title       : 'Tasks',
				collapsible : true
			},

			// Define properties for the left 'locked' and scrollable tree view
			lockedViewConfig : {
				// Adds a CSS class to each row element
				getRowClass : function (rec) {
					return rec.isRoot() ? 'root-row' : '';
				},

				// Enable node reordering in the locked grid
				plugins     : {
					ptype           : 'treeviewdragdrop',
					containerScroll : true
				}
			},

			// Define properties for the schedule section
			schedulerConfig  : {
				collapsible : true,
				title       : 'Schedule'
			},

			// Define what should be shown in the left label field, along with the type of editor
			leftLabelField : {
				dataIndex : 'Name',
				editor    : { xtype : 'textfield' }
			},

			// Add some extra functionality
			plugins        : [
				Ext.create("Frx.panel.HatioTaskContextMenu"),
				Ext.create("Sch.plugin.Pan"),
				Ext.create('Sch.plugin.TreeCellEditing', { clicksToEdit : 2 }),
				Ext.create('Gnt.plugin.TaskEditor'),

				// Lazy style definition using 'ptype'
				{
					ptype : 'scheduler_lines',
					innerTpl : '<span class="line-text">{Text}</span>',
					store : new Ext.data.JsonStore({
						fields : [ 'Date', 'Text', 'Cls' ],
						data : [ {
							Date : new Date(2010, 8, 26),
							Text : 'Project kickoff',
							Cls  : 'kickoff' // A CSS class
						} ]
					})
				} ],

			// Define an HTML template for the tooltip
			tooltipTpl     : new Ext.XTemplate(
				'<strong class="tipHeader">{Name}</strong>',
				'<table class="taskTip">',
					'<tr><td>Start:</td> <td align="right">{[values._record.getDisplayStartDate("y-m-d")]}</td></tr>',
					'<tr><td>End:</td> <td align="right">{[values._record.getDisplayEndDate("y-m-d")]}</td></tr>',
					'<tr><td>Progress:</td><td align="right">{[ Math.round(values.PercentDone)]}%</td></tr>',
				'</table>'
			),

			eventRenderer : function (task) {
				if (task.get('Color')) {
					var style = Ext.String.format('background-color: #{0};border-color:#{0}', task.get('Color'));
					return {
						// Here you can add custom per-task styles
						style : style
					};
				}
			},

            // Define the static columns
			columns       : [ /*{
				dataIndex : 'Id',
				header    : 'ID',
				align     : 'center',
				width     : 40,
				// This CSS class is added to each cell of this column
				tdCls     : 'id'
			}, */{
				xtype : 'wbscolumn',
				width : 50
			}, {
				xtype     : 'namecolumn',
				dataIndex : 'Name',
				header    : T('title.task'),
				width     : 200,
				renderer  : function (v, meta, r) {
					if (!(r % 2)) meta.tdCls = 'sch-odd-row';
					return v;
				}
			}, {
				xtype : 'startdatecolumn',
				width : 80
			}, {
				xtype : 'enddatecolumn',
				width : 80
			}, {
				xtype : 'durationcolumn'
			}, {
				xtype : 'percentdonecolumn',
				width : 70,
				renderer : function(val) {
					val = Ext.util.Format.number(val, '0.0');
					return val + ' %';
				}
			}, {
				xtype : 'milestonecolumn',
				width : 75
			}, {
				xtype   : 'resourceassignmentcolumn',
				header  : 'Assigned Resources',
				width   : 250
			}/*, {
				xtype : 'effortcolumn'
			}, {
				xtype : 'slackcolumn'
			}, {
				xtype : 'predecessorcolumn'
			}, {
				xtype : 'addnewcolumn'
			}*/ ]
		});

		this.callParent(arguments);
    }
});
