import fetch from 'node-fetch'
import Chance from 'chance';
 
const chance = new Chance(process.env.THREADS_USERNAME)
 
const DEVICE_ID = `android-${chance.string({ pool: 'abcdef0123456789', length: 16 })}`
const MID = chance.string({ length: 28, alpha: true, numeric: true });
const PHONE_ID = chance.guid()
const UUID = chance.guid()
 
export async function login (username, password) {
    const params = {
        "client_input_params": {
            "device_id": `${DEVICE_ID}`,
            "login_attempt_count": 1,
            "secure_family_device_id": "",
            "machine_id": `${MID}`,
            "accounts_list":[],
            "auth_secure_device_id": "",
            "password": password,
            "family_device_id": `${UUID}`,
            "fb_ig_device_id": [],
            "device_emails": [],
            "try_num": 1,
            "event_flow": "login_manual",
            "event_step": "home_page",
            "openid_tokens": {},
            "client_known_key_hash": "",
            "contact_point": username,
            "encrypted_msisdn": ""
        },"server_params": {
            "username_text_input_id": "5bjueo:48",
            "device_id": `${DEVICE_ID}`,
            "should_trigger_override_login_success_action": 0,
            "server_login_source": "login",
            "waterfall_id": "9d72aec5-9d24-40c1-a6fe-976c34c72727",
            "login_source": "Login",
            "INTERNAL__latency_qpl_instance_id": 32173252800210,
            "is_platform_login": 0,
            "credential_type": "password",
            "family_device_id": `${UUID}`,
            "INTERNAL__latency_qpl_marker_id": 36707139,
            "offline_experiment_group": "caa_iteration_v3_perf_ig_4",
            "INTERNAL_INFRA_THEME": "harm_f",
            "password_text_input_id": "5bjueo:49",
            "ar_event_source": "login_home_page"
        }
    }
    const bloksVersioning = { "bloks_version": "5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73", "styles_id": "instagram" }
 
    const request = await fetch('https://i.instagram.com/api/v1/bloks/apps/com.bloks.www.bloks.caa.login.async.send_login_request/', {
        method: 'POST',
        body: new URLSearchParams({
            params: JSON.stringify(params),
            bk_client_context: JSON.stringify(bloksVersioning),
            bloks_versioning_id: '5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73'
        }),
        headers: {
            "X-Ig-Nav-Chain": "BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:1:cold_start:1688838797.251::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:2:button:1688838797.365::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_action_list_view_controller:3:button:1688839301.553::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:4:button:1688839304.596::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_profile:5:button:1688839305.471::",
            "User-Agent": "Barcelona 289.0.0.77.109 Android (26/8.0.0; 420dpi; 1080x1794; unknown/Google; Pixel; vbox86p; vbox86; en_US; 489720150)",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Ig-Timezone-Offset": "0",
            "Ig-Intended-User-Id": "0",
            "X-Bloks-Version-Id": " 5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73",
            "X-Ig-App-Locale": "en_US",
            "X-Ig-Device-Locale": "en_US",
            "X-Ig-Mapped-Locale": "en_US",
            "X-Ig-App-Id": "3419628305025917",
            "X-Ig-Connection-Type": "WIFI",
            "X-Fb-Connection-Type": "WIFI",
            "X-Fb-Http-Engine": "Liger",
            "X-Fb-Client-Ip": "True",
            "X-Fb-Server-Cluster": "True",
            "X-Pigeon-Rawclienttime": "1688829240.902",
            "X-Tigon-Is-Retry": "True",
            "X-Tigon-Is-Retry": "True",
            "X-Ig-Device-Id": `${PHONE_ID}`,
            "X-Ig-Family-Device-Id": `${UUID}`,
            "X-Ig-Android-Id": `${DEVICE_ID}`,
            "X-Mid": `${MID}`,
            "X-Pigeon-Session-Id": "UFS-ce1e1538-7e4d-483e-8e1a-280178ea62dd-0",
        }  
    })
 
    const response = await request.text()
    const token = response.match('(?<=Bearer IGT:2:).*?(?=\\\\)')
    const userPk = response.match('(?<="pk_id\\\\+\\":\\\\+").*?(?=\\\\)')
    return { authorization: token[0], userPk: userPk[0] }
}
 
function getFollowing (maxId = 0, userPk, authToken = null ,userId) {
    return fetch(`https://i.instagram.com/api/v1/friendships/${userPk}/following/?include_user_count=true&search_surface=barcelona_following_graph_page&max_id=${maxId}`, {
        method: 'GET',
        headers: {
            "X-Ig-Nav-Chain": "BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:1:cold_start:1688838797.251::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:2:button:1688838797.365::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_action_list_view_controller:3:button:1688839301.553::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:4:button:1688839304.596::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_profile:5:button:1688839305.471::",
            'X-Bloks-Version-Id': '5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73',
            'User-Agent': 'Barcelona 289.0.0.77.109 Android (26/8.0.0; 420dpi; 1080x1794; unknown/Google; Pixel; vbox86p; vbox86; en_US; 489720150)',
            'Authorization': `Bearer IGT:2:${authToken}`,
            "X-Ig-Timezone-Offset": "0",
            "X-Ig-App-Locale": "en_US",
            "X-Ig-Device-Locale": "en_US",
            "X-Ig-Mapped-Locale": "en_US",
            "X-Ig-App-Id": "3419628305025917",
            "X-Ig-Connection-Type": "WIFI",
            "X-Fb-Connection-Type": "WIFI",
            "X-Fb-Http-Engine": "Liger",
            "X-Fb-Client-Ip": "True",
            "X-Fb-Server-Cluster": "True",
            "X-Pigeon-Rawclienttime": "1688829240.902",
            "X-Tigon-Is-Retry": "True",
            "X-Tigon-Is-Retry": "True",
            "X-Ig-Device-Id": `${PHONE_ID}`,
            "X-Ig-Family-Device-Id": `${UUID}`,
            "X-Ig-Android-Id": `${DEVICE_ID}`,
            "X-Mid": `${MID}`,
            "X-Pigeon-Session-Id": "UFS-ce1e1538-7e4d-483e-8e1a-280178ea62dd-0",
 
            "Ig-U-Ds-User-Id": `${userId}`,
        }      
    })
}
 
function getProfile (id, authToken = null, userId) {
    return fetch(`https://i.instagram.com/api/v1/friendships/show/${id}/`, {
        method: 'GET',
        headers: {
            "X-Ig-Nav-Chain": "BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:1:cold_start:1688838797.251::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:2:button:1688838797.365::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_action_list_view_controller:3:button:1688839301.553::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:4:button:1688839304.596::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_profile:5:button:1688839305.471::",
            'X-Bloks-Version-Id': '5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73',
            'User-Agent': 'Barcelona 289.0.0.77.109 Android (26/8.0.0; 420dpi; 1080x1794; unknown/Google; Pixel; vbox86p; vbox86; en_US; 489720150)',
            'Authorization': `Bearer IGT:2:${authToken}`,
            "X-Ig-Timezone-Offset": "0",
            "X-Ig-App-Locale": "en_US",
            "X-Ig-Device-Locale": "en_US",
            "X-Ig-Mapped-Locale": "en_US",
            "X-Ig-Www-Claim": "0",
            "X-Ig-Bandwidth-Speed-Kbps": "4.000",
            "X-Ig-Bandwidth-Totalbytes-B": "0",
            "X-Ig-Bandwidth-Totaltime-Ms": "0", 
            "X-Ig-App-Id": "3419628305025917",
            "X-Ig-Connection-Type": "WIFI",
            "X-Fb-Connection-Type": "WIFI",
            "X-Fb-Http-Engine": "Liger",
            "X-Fb-Client-Ip": "True",
            "X-Fb-Server-Cluster": "True",
            "X-Pigeon-Rawclienttime": "1688829240.902",
            "X-Tigon-Is-Retry": "True",
            "X-Tigon-Is-Retry": "True",
            "X-Ig-Device-Id": `${PHONE_ID}`,
            "X-Ig-Family-Device-Id": `${UUID}`,
            "X-Ig-Android-Id": `${DEVICE_ID}`,
            "X-Mid": `${MID}`,
            "X-Pigeon-Session-Id": "UFS-ce1e1538-7e4d-483e-8e1a-280178ea62dd-0",
            "Ig-U-Ds-User-Id": `${userId}`,
        }  
    })
}
 
async function unfollow (id, authToken = null, userId) {
    const payload = {
        "user_id": `${id}`,
        "radio_type": "wifi-none",
        "_uid":"2109909886",
        "_uuid":"45da3ac6-b663-4669-89e9-49360a51fa68",
        "nav_chain":"BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:1:cold_start:1688808997.661::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:2:button:1688808997.782::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_profile:3:button:1688809012.31::,TRUNCATEDx11,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_profile:15:button:1688812687.429::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_follow_list:16:button:1688812698.106::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_profile:17:button:1688812699.309::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_follow_list:18:button:1688812701.984::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_profile:19:button:1688812703.507::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_follow_list:20:button:1688812704.970::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_profile:21:button:1688812707.569::",
        "container_module":"ig_text_feed_profile"
    }
 
    return fetch(`https://i.instagram.com/api/v1/friendships/destroy/${id}/`, {
        method: 'POST',
        body: {
            signed_body: `SIGNATURE.${JSON.stringify(payload)}`
        },
        headers: {
            "X-Ig-Nav-Chain": "BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:1:cold_start:1688838797.251::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:2:button:1688838797.365::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_action_list_view_controller:3:button:1688839301.553::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_timeline:4:button:1688839304.596::,BarcelonaNavigationLogger$logNavigationCompleted$1:ig_text_feed_profile:5:button:1688839305.471::",
            'X-Bloks-Version-Id': '5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73',
            'User-Agent': 'Barcelona 289.0.0.77.109 Android (26/8.0.0; 420dpi; 1080x1794; unknown/Google; Pixel; vbox86p; vbox86; en_US; 489720150)',
            'Authorization': `Bearer IGT:2:${authToken}`,
            "X-Ig-Timezone-Offset": "0",
            "X-Ig-App-Locale": "en_US",
            "X-Ig-Device-Locale": "en_US",
            "X-Ig-Mapped-Locale": "en_US",
            "X-Ig-App-Id": "3419628305025917",
            "X-Ig-Connection-Type": "WIFI",
            "X-Fb-Connection-Type": "WIFI",
            "X-Fb-Http-Engine": "Liger",
            "X-Fb-Client-Ip": "True",
            "X-Fb-Server-Cluster": "True",
            "X-Pigeon-Rawclienttime": "1688829240.902",
            "X-Tigon-Is-Retry": "True",
            "X-Tigon-Is-Retry": "True",
            "X-Ig-Device-Id": `${PHONE_ID}`,
            "X-Ig-Family-Device-Id": `${UUID}`,
            "X-Ig-Android-Id": `${DEVICE_ID}`,
            "X-Mid": `${MID}`,
            "X-Pigeon-Session-Id": "UFS-ce1e1538-7e4d-483e-8e1a-280178ea62dd-0",
            "Ig-U-Ds-User-Id": `${userId}`,
 
        }  
    })   
}
 
const followings = []
 
async function main () {
    console.log(`==== UNFLLOW NOT FOLLOWBACK (Threads by META )====`)
    console.log(`- Set Username/Password on ENV VAR\n`)
 
    const username = process.env.THREADS_USERNAME
    const password = process.env.THREADS_PASSWORD
    
    console.log(`Login for username ${username} ...`)
    const { authorization, userPk } = await login(username, password)
    console.log(`Get PK ${userPk}\n`)
 
    console.log('Collecting Cursor...')
    let maxId = 0
    do {
        const following = await getFollowing(maxId, userPk, authorization, userPk)
        const response = await following.json()
 
        if ('next_max_id' in response) {
            console.log(`GET NEXT MAX ID ${response.next_max_id}`)
            maxId = response.next_max_id
        } else {
            maxId = null
        }
 
        followings.push(...response.users)
    } while (maxId !== null)
 
    console.log()
 
    for(const user of followings) {
 
        const profile = await getProfile(user.pk, authorization, userPk)
        const profileJson = await profile.json()
 
        const following = profileJson.following
        const followBy = profileJson.followed_by
 
        if (following & followBy) {
            console.log(`${user.username}, [${user.full_name}] Following and followed`)            
        }
 
        if (following && !followBy) {
            const unfollowing = await unfollow(user.pk, authorization, userPk)
            const unfollowJSON = await unfollowing.json()
            console.log(`${user.username}, [${user.full_name}] Following but not followback, removed... ${unfollowJSON.status}`)
        }
 
        if (followBy && !following) {
            console.log(`${user.username}, [${user.full_name}] Followed but not following back`)
        }
 
    }
}
 
main()
