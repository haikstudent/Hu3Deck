import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSliderModule} from '@angular/material/slider';

import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { CreateObjectComponent } from './create-object/create-object.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AssignObjectComponent } from './assign-object/assign-object.component';
import { CreateSceneComponent } from './create-scene/create-scene.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardOverviewComponent,
    CreateSessionComponent,
    CreateObjectComponent,
    StatisticsComponent,
    CreateUserComponent,
    AssignObjectComponent,
    CreateSceneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DragDropModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
