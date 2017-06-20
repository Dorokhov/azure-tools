import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RedisDataStructure } from '../viewModels/redisDataStructures';
import { RedisKeyViewModel } from '../viewModels/redisKeyViewModel';
import { ExpandableViewModel } from '../viewModels/expandableViewModel';

@Component({
  templateUrl: './redis/components/key.details.component.view.html',
  selector: 'key-details',
  inputs: ['selectedTreeViewModel']
})


export class KeyDetailsComponent {
  public selectedTreeViewModel: ExpandableViewModel;
  public _ = _;

  constructor() { }
}