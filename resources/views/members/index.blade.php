@extends('layouts.app')
@section('content')
    <h1>Members</h1>
    @foreach($members as $member)
        <p>Name:{{$member->fullname}}
        Username:{{$member->username}}
        </p>
    @endforeach

@endsection
