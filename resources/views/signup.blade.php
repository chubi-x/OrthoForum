@extends('layouts.app')
@extends('layouts.error')
@section("content")
    @if( session("member_signup"))
        <p>{{session("member_signup")}}</p>
    @endif
        <form action="{{route('user.store')}}" method="post">
            @csrf
            <label for="fullname">
                Full Name:
                <input type="text" id="fullname" name="fullname" value="{{old("fullname")}}"  required/>
            </label>
            <label for="username">
                User name:
                <input type="text" id="username" name="username" value="{{old("username")}}" required/>
            </label>
            <label for="email">
                Email:
                <input type="email" id="email" name="email" value="{{old("email")}}" required/>
            </label>
            Password:
            <label for="password">
                <input type="password" id="password" name="password" value="{{old("password")}}" required/>
            </label>
            <input type="submit"/>
        </form>
@endsection
