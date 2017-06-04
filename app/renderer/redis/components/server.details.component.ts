import { MdDialog, MdDialogRef } from '@angular/material';
import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RedisDataStructure } from '../viewModels/redisDataStructures';
import { RedisKeyViewModel } from '../viewModels/redisKeyViewModel';
import { ExpandableViewModel } from '../viewModels/expandableViewModel';
import { ServerViewModel } from '../viewModels/serverViewModel';
import { UserPreferencesRepository } from '../model/userPreferencesRepository';
import { RedisServer } from '../model/profile';
import { KeyChangesEmitter } from '../services/keychangesemitter';
import { ConfirmDialogComponent } from '../components/confirm.component';

@Component({
  templateUrl: './redis/components/server.details.component.view.html',
  selector: 'server-details',
  inputs: ['selectedTreeViewModel']
})


export class ServerDetailsComponent {
  public selectedTreeViewModel: ExpandableViewModel;
  public _ = _;
  private userPreferencesRepository: UserPreferencesRepository;
  private eventEmitter: KeyChangesEmitter;
  private dialog: MdDialog;

  constructor(userPreferencesRepository: UserPreferencesRepository, eventEmitter: KeyChangesEmitter, dialog: MdDialog) {
    this.userPreferencesRepository = userPreferencesRepository;
    this.eventEmitter = eventEmitter;
    this.dialog = dialog;
  }

  public deleteServer() {
    let serverVm = <ServerViewModel>this.selectedTreeViewModel;
    let confirmRef = this.dialog.open(ConfirmDialogComponent, { disableClose: true });
    confirmRef.componentInstance.message = `Are you sure you want to delete '${serverVm.model.host} server'?`;
    confirmRef.afterClosed().subscribe(result => {
      if (result.isConfirmed) {
        this.deleteServerInternal(serverVm);
      }
    });
  }

  private deleteServerInternal(serverVm: ServerViewModel) {
    console.log('delete server: start');
    let tuple = this.userPreferencesRepository.getCurrentProfile();
    let userPreferences = tuple[0];
    let currentProfile = tuple[1];
    let serverToRemove: RedisServer = _.find(currentProfile.servers, x => x.host === serverVm.model.host);
    console.log('delete server: following server will be removed from user profile');
    console.log(serverToRemove);
    console.log(`delete server: number of servers before remove equals to ${currentProfile.servers.length}`);
    _.remove(currentProfile.servers, each => {
      return each.host === serverToRemove.host;
    });
    console.log(`delete server: number of servers after remove equals to ${currentProfile.servers.length}`);
    console.log('delete server: saving following preferences');
    console.log(userPreferences);
    this.userPreferencesRepository.save(userPreferences);
    console.log('delete server: server deleted successfully');
    this.eventEmitter.serverDeleted(serverVm);
    console.log('delete server: event emmited successfully');
  }
}