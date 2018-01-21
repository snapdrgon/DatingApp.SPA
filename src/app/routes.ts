import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';


export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '',
     runGuardsAndResolvers: 'always',
     canActivate: [AuthGuard],
     children: [
     {path: 'lists', component: ListsComponent},
     {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
     {path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}, 
     canDeactivate: [PreventUnsavedChangesGuard]},
     {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
     {path: 'messages', component: MessagesComponent}
    ]},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
