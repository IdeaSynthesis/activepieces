import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionService } from 'packages/frontend/src/app/modules/common/service/collection.service';
import { Observable, switchMap, tap } from 'rxjs';
import { FlowService } from 'packages/frontend/src/app/modules/common/service/flow.service';
import { Flow } from '@activepieces/shared';

@Component({
	selector: 'app-empty-collections-table',
	templateUrl: './empty-collections-table.component.html',
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyCollectionsTableComponent {
	creatingCollection = false;
	piecesPage: any;
	createCollection$: Observable<Flow>;
	constructor(
		private router: Router,
		private collectionService: CollectionService,
		private flowService: FlowService
	) { }

	createCollection() {
		if (!this.creatingCollection) {
			this.creatingCollection = true;
			const collectionDiplayName = 'Untitled';
			this.createCollection$ = this.collectionService.create({
				displayName: collectionDiplayName,
			}).pipe(
				switchMap(collection => {
					return this.flowService.create({ collectionId: collection.id, displayName: 'Flow 1' });
				}),
				tap(flow => {
					this.router.navigate(['/flows/', flow.collectionId], { queryParams: { newCollection: true } });
				})
			);
		}
	}
}
