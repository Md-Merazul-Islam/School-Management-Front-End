#include <bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace __gnu_pbds;
using namespace std;
#define PI 3.14159265359
#define dmin 1e-9
#define dd double
#define ll long long
#define yes cout << "YES\n"
#define no cout << "NO\n"
#define pb push_back
#define vi vector<ll>
#define vpi vector<pair<ll, ll>>
#define pii pair<ll, ll>
#define srt(a) sort(a.begin(), a.end())
#define all(a) a.begin(), a.end()
#define rsrt(a) sort(a.rbegin(), a.rend())
#define line "\n"
#define nl cout << "\n"
#define out(x) cout << x << "\n";
#define loop(i, a, b) for (int i = (a); i < (b); ++i)
#define rloop(i, a, b) for (int i = (a); i >= (b); --i)
#define scan(a) loop(i, 1, a.size()) cin >> a[i]
#define fast ios_base::sync_with_stdio(false), cin.tie(NULL);
void print(vector<ll> &a) { loop(i, 1, a.size()) cout << a[i] << ' '; }
template <typename T>
using my_ordered_set = tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;
const int N = 2e5 + 5;
// const int N = 200010;
int a[N], b[N];
void hello_world_solve_here()
{
    int n;
    cin >> n;
    int appeared = 0;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
        if (a[i] != -1)
            b[i] = a[i], appeared = 1;
        else
            b[i] = b[i - 1] / 2;
        if (appeared && b[i] == 0)
            b[i] = 2;
    }
    b[n + 1] = 0;
    for (int i = n; i >= 1; i--)
    {
        if (a[i] == -1)
            b[i] = max(b[i + 1] / 2, b[i]);
        if (b[i] == 0)
            b[i] = 2;
    }
    for (int i = 1; i < n; i++)
        if (b[i] != b[i + 1] / 2 && b[i + 1] != b[i] / 2)
        {
            cout << -1 << endl;
            return;
        }
    for (int i = 1; i <= n; i++)
        cout << b[i] << " ";
    puts("");
}
signed main()
{
    fast;
    int t;
    cin >> t;
    while (t--)
        hello_world_solve_here();
    return 0;
}
